import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket"; // Make sure this path is correct

const VideoChat = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const offerRef = useRef(null);

  // 'idle' | 'calling' | 'receiving' | 'inCall'
  const [callState, setCallState] = useState("idle");

  // STUN server configuration
  const pcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // 1. Initialize media and socket listeners
  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    init();
    if (roomId) socket.emit("join_room", roomId);

    // Setup socket listeners
    socket.on("webrtc-offer", handleOffer);
    socket.on("webrtc-answer", handleAnswer);
    socket.on("webrtc-ice-candidate", handleICECandidate);
    socket.on("call-rejected", handleCallRejected);
    socket.on("hang-up", endCall);

    // Cleanup function
    return () => {
      socket.off("webrtc-offer", handleOffer);
      socket.off("webrtc-answer", handleAnswer);
      socket.off("webrtc-ice-candidate", handleICECandidate);
      socket.off("call-rejected", handleCallRejected);
      socket.off("hang-up", endCall);
      endCall(); // Ensure cleanup on component unmount
    };
  }, [roomId]);

  // 2. Helper to create and configure the Peer Connection
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(pcConfig);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", { roomId, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }
    };

    // Add local tracks to the connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    peerConnectionRef.current = pc;
  };

  // 3. --- CALLER'S FLOW ---
  const startCall = async () => {
    if (!localStreamRef.current) return alert("Your camera is not available.");
    createPeerConnection();
    setCallState("calling");
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("webrtc-offer", { roomId, offer });
    } catch (err) {
      console.error("Error creating offer:", err);
    }
  };

  // 4. --- CALLEE'S FLOW ---
  const handleOffer = ({ offer }) => {
    if (callState === "inCall") return; // Ignore if already in a call
    offerRef.current = offer;
    setCallState("receiving");
  };

  const acceptCall = async () => {
    if (!localStreamRef.current) return alert("Your camera is not available.");
    createPeerConnection();
    setCallState("inCall");
    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offerRef.current));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("webrtc-answer", { roomId, answer });
      offerRef.current = null; // Clear stored offer
    } catch (err) {
      console.error("Error creating answer:", err);
    }
  };

  const rejectCall = () => {
    socket.emit("call-rejected", { roomId });
    setCallState("idle");
    offerRef.current = null;
  };

  // 5. --- FINALIZING CONNECTION ---
  const handleAnswer = async ({ answer }) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      setCallState("inCall");
    } catch (err) {
      console.error("Error setting remote description:", err);
    }
  };

  const handleICECandidate = async ({ candidate }) => {
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (err) {
      console.error("Error adding ICE candidate:", err);
    }
  };

  const handleCallRejected = () => {
    alert("The other user rejected the call.");
    setCallState("idle");
  };

  // 6. --- ENDING THE CALL ---
  const endCall = () => {
    if (callState !== "idle") {
      socket.emit("hang-up", { roomId });
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.ontrack = null;
      peerConnectionRef.current.onicecandidate = null;
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setCallState("idle");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-4">
      <h2 className="text-3xl font-bold mb-6">Video Call Room</h2>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        {/* Local Video */}
        <div className="relative border border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-auto max-w-md bg-black"
          />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded-md text-sm">You</span>
        </div>

        {/* Remote Video */}
        <div className="relative border border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full h-auto max-w-md bg-black"
          />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded-md text-sm">Partner</span>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {callState === "idle" && (
          <button onClick={startCall} className="px-6 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700 transition">Start Call</button>
        )}
        {callState === "inCall" && (
          <button onClick={endCall} className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition">End Call</button>
        )}
      </div>

      {/* --- Notification Modals --- */}
      {callState === "calling" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold">📞 Calling Partner...</h3>
            <button onClick={endCall} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">Cancel</button>
          </div>
        </div>
      )}

      {callState === "receiving" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold">Incoming Call! 📲</h3>
            <div className="flex gap-6 mt-2">
              <button onClick={acceptCall} className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">Accept</button>
              <button onClick={rejectCall} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;

