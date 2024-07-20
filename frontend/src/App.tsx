import { useEffect, useState } from 'react'

function App() { 
  const [socket, setSocket] = useState<WebSocket | null>(null); 
  const [receive, setReceive] = useState<string[]>([]); 
  const [val, setValue] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('wss://chat-application-gvfr.onrender.com'||'ws://localhost:300');
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

  const handleEnter = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(val);
      setValue("");
    } else {
      console.log('WebSocket is not open');
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="font-bold mt-4 text-center bg-slate-100 p-3 flex justify-center w-full">
        CHAT APPLICATION USING WEB SOCKETS
      </h1>
    
      <div className="flex flex-col bg-slate-400 mt-3 overflow-y-auto rounded-md shadow-md w-11/12 md:w-1/2 h-4/5">
        <div className="p-3 flex-1 overflow-y-auto">
          {receive.map((c, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded-md shadow-sm">
              {c}
            </div>
          ))}
        </div>
        
        <div className="flex bg-slate-200 p-3">
          <input 
            className="flex-1 h-10 rounded-md p-2 mr-2" 
            type="text"  
            onChange={(e) => { setValue(e.target.value) }} 
            value={val} 
            placeholder="Type your message here"
          />
          <button 
            onClick={handleEnter} 
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enter
          </button> 
        </div>
      </div>
    </div>
  )
}

export default App
