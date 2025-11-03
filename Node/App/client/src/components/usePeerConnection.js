import { useRef, useEffect } from "react";
import socket from "../socket";

export const usePeerConnection = (roomId, localStream) => {
  const pcRef = useRef(null);
  const fileChannelRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const offerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    // Initialize PeerConnection
    if (!pcRef.current) {
      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // ICE candidate
      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("webrtc-ice-candidate", { roomId, candidate: event.candidate });
        }
      };

      // Remote tracks
      pcRef.current.ontrack = (event) => {
        remoteStreamRef.current = event.streams[0];
      };

      // File/data channel
      fileChannelRef.current = pcRef.current.createDataChannel("fileChannel", { ordered: true });
      fileChannelRef.current.onopen = () => console.log("File channel open");
      fileChannelRef.current.onclose = () => console.log("File channel closed");

      let receivedBuffers = [];
      let fileMeta = null;

      fileChannelRef.current.onmessage = (e) => {
        const data = e.data;

        if (typeof data === "string" && data.startsWith("metadata:")) {
          fileMeta = JSON.parse(data.replace("metadata:", ""));
          socket.emit("file-info", `Receiving file: ${fileMeta.name}`);
          return;
        }

        receivedBuffers.push(data);
        const receivedSize = receivedBuffers.reduce((acc, b) => acc + b.byteLength, 0);

        if (fileMeta && receivedSize >= fileMeta.size) {
          const blob = new Blob(receivedBuffers);
          const url = URL.createObjectURL(blob);

          socket.emit("file-received", { url, name: fileMeta.name });

          // Reset buffers
          receivedBuffers = [];
          fileMeta = null;
        }
      };
    }

    // Add local tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (!pcRef.current.getSenders().some(sender => sender.track === track)) {
          pcRef.current.addTrack(track, localStream);
        }
      });
    }

  }, [roomId, localStream]);

  // Caller: create offer
  const createOffer = async () => {
    if (!pcRef.current) return;
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit("webrtc-offer", { roomId, offer });
  };

  // Callee: handle offer
  const handleOffer = async (offer) => {
    if (!pcRef.current) return;
    offerRef.current = offer;
  };

  // Create answer
  const createAnswer = async () => {
    if (!pcRef.current || !offerRef.current) return;
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(offerRef.current));
    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);
    socket.emit("webrtc-answer", { roomId, answer });
    offerRef.current = null;
  };

  // Handle answer
  const handleAnswer = async (answer) => {
    if (!pcRef.current) return;
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Add ICE candidate
  const addICECandidate = async (candidate) => {
    if (!pcRef.current) return;
    await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  // End call
  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
      fileChannelRef.current = null;
      remoteStreamRef.current = null;
    }
  };

  return {
    pcRef,
    fileChannelRef,
    remoteStreamRef,
    createOffer,
    handleOffer,
    createAnswer,
    handleAnswer,
    addICECandidate,
    endCall,
  };
};
