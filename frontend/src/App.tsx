import { useEffect, useState } from 'react'
function App() { 
  const [socket,setSocket] =useState<WebSocket|null>(null) ; 
  const [receive,setReceive] =useState([]); 
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
    <div>
     
    
    <div className="flex flex-col bg-slate-400 m-11" style={{height:"50vh",width:"40vw"}}>
      
      <div className="p-3">{receive.map((c)=>(<div className="mb-2">{c}</div>))}</div>
    <div className="flex bg-slate-200 m-2 absolute top-2/4"> 
      <input type="text"  onChange={(e)=>{setvalue(e.target.value)}} value={val}></input> 
    <button onClick={handleenter} > enter</button> 
    </div>
   
    </div>
    </div>
  )
}

export default App
