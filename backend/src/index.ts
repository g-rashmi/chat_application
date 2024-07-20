import express from "express" 

import {WebSocketServer,WebSocket} from "ws"; 
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const app=express();  
const httpserver=app.listen(300); 
const wss = new WebSocketServer({server:httpserver}) 
 wss. on('connection',function connection (ws){
ws.on('error',console.error); 
const clientColor = getRandomColor();
ws.send(`color:${clientColor}`);
ws.on('message',function message(data,isbinary){ 
  wss.clients.forEach(function each(client){
    if(client.readyState===WebSocket.OPEN){
      client.send(data,{binary:isbinary}); 
    }
  })

}) 

 })
