import { useEffect, useState } from 'react'
function App() { 
  const [socket,setSocket] =useState<WebSocket|null>(null) ; 
  const [receive,setReceive] =useState<string[]>([]); 
  const [val,setvalue]=useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:300');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('Connection established');
    };

    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setReceive((prevReceive) => [...prevReceive, message.data]);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => newSocket.close();
  }, []);

  
   
  const handleenter = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(val);
      setvalue("");
    } else {
      console.log('WebSocket is not open');
    }
  
    }
    
    



  return (
    <div style={{height:"100vh",width:"100vw"}}>
     <div><h1 className="font-bold mt-4 text-center  bg-slate-100 p-3  align-middle flex justify-center">CHAT_APPLICATION USING WEB SOCKETS</h1></div>
    
    <div className="flex flex-col bg-slate-400 absolute left-1/4 m-3 overflow-x-auto" style={{width:"34%",height:"90%"}}>
      
      <div className="p-3">{receive.map((c)=>(<div className="mb-2">{c}</div>))}</div>
    <div className="flex bg-slate-200 ml-7 absolute bottom-3 "> 
      <input  className="w-80 h-10 rounded-md" type="text"  onChange={(e)=>{setvalue(e.target.value)}} value={val}></input> 
    <button onClick={handleenter} className="p-2" > enter</button> 
    </div>
   
    </div>

    </div>
  )
}

export default App
