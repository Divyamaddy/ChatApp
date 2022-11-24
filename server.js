
const express = require('express');
let app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
})



io.on('connection',function(socket){
    console.log('user joined');
    // setTimeout(function(){
    //     socket.send("has joined thhe chat");     
    // })
    socket.on('message',(msg)=>{        //msg from client
      socket.broadcast.emit('message',msg);   //send msg to all the connected sockets
    })
})

http.listen(8000,function(){
    console.log("server running.....")
})