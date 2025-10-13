import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function Modal({children}){
    const portalRoot =document.getElementById("portal-root")
    return ReactDOM.createPortal(
        <div id='modal-style'>{children}</div>,portalRoot
    )
}

function Portals(){
    const [showModal, setShowModal] = useState(false)


    return(
        <div className="app-container">
            <button onClick={()=>{setShowModal(true)}}>Show Modal </button>
      

    {showModal && (
        <Modal>
        <h2>THis is the Modal </h2>
         <p>Yeh component DOM mein #portal-root ke andar render ho raha hai, #root ke andar nahi.</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </Modal>
    )}

    
      </div>
    )
}
export default Portals;