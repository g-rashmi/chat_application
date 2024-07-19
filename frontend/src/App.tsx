import { useEffect, useState } from 'react'
function App() { 
  const [socket,setSocket] =useState<WebSocket|null>(null) ; 
  const [receive,setReceive] =useState([]); 
  const [actual,setactual]=useState("");  
  const [val,setvalue]=useState("");
const handleenter=()=>{
  
    const newSocket = new WebSocket('ws://localhost:300'); 
    newSocket.onopen=()=>{
      console.log('connection establish');  
      newSocket.send(val);
    } 
    newSocket.onmessage=(message)=>{
      console.log('Message received:', message.data); 

      setactual(message.data) ; 
      setSocket(newSocket);
      return () => newSocket.close();
    }
    
    
}


  return (
    <div>
      <input type="text" className="" onChange={(e)=>{setvalue(e.target.value)}}></input> 
      <button onClick={handleenter}> enter</button> 

      
      <div>{actual}</div>
    </div>
  )
}

export default App
