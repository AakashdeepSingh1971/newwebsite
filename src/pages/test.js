import Head from "next/head";
import { useEffect, useState } from "react";

export default function Noman() {
    const [show, setshow] = useState(false)
    return (
        <div>
            <Head>
                <title>NextWind</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <button onClick={() => setshow(true)}> show modal</button>

                <Modal title="my modal" onClose={()=> setshow(false)} show={show} > 
                <p>
                </p>
                </Modal>
            </div>
        </div >
    );
}


const Modal = props => {
    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.KeyCode) === 27) { }
    }
    useEffect(() =>{
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return function cleanup(){
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }
    },[])
    return (
        <div className={`modal ${props.show ? 'show':' '}`} onClick={props.onclose}><div className= " fixed bg-black bg-opacity-10 flex items-center justify-center inset-0  ">
            <div className=" h-2/5 w-2/5 bg-white" onClick={e => e.stopPropagation()}>
                <div className="p-10">
                    <h4 className="modal-title ">{props.title}
                        
            </h4>
                </div>
                <div className="p-10 border-t-8 border-b border-indigo-600 ">{props.childern}
                    
          </div>
                <div className="p-10">
                    <button className="button"> close </button>
                </div>
            </div>
            </div>
        </div>
    )
}