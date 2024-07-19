import express from "express"   
import {WebSocketServer,WebSocket} from "ws"; 

const app=express();  
const httpserver=app.listen(300); 
const wss = new WebSocketServer({server:httpserver}) 
 wss. on('connection',function connection (ws){
ws.on('error',console.error); 
ws.on('message',function message(data,isbinary){ 
  wss.clients.forEach(function each(client){
    if(client.readyState===WebSocket.OPEN){
      client.send(data,{binary:isbinary}); 
    }
  })

}) 
ws.send('hello msg from server!') 
 })
