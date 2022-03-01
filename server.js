const express=require('express');
const path=require('path');
const http=require('http')
const socketio=require('socket.io');
const format=require('./message')
const dotenv=require('dotenv')
const {adduser,getcurrent,userleave,getroomusers} =require('./users')

dotenv.config();

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use(express.static(path.join(__dirname,'public')))
const port=  process.env.PORT || 3000


io.on('connection',socket=>{
    socket.on('joinroom',({username,room})=>{
         
        const user=adduser(socket.id,username,room)
        
        socket.join(user.room);
 
        socket.to(user.name).emit('message',format('chat bot','welcome to chat!!!'))

        socket.broadcast.to(user.room).emit('message',format('chat bot',`a ${user.username} joined the chat!!!`))

        io.to(room).emit('roomusers',{
            room,
            users:getroomusers(room)
        })
    })

  

    socket.on('disconnect',()=>{
        const user= userleave(socket.id);
             if(user){
                io.to(user.room).emit('message',format('chat bot',`${user.username} left the chat!!!`))


                io.to(user.room).emit('roomusers',{
                    room:user.room,
                    users:getroomusers(user.room)
                })
             }

             
     
     
    })

    socket.on('send',(msg)=>{
        const user=getcurrent(socket.id);

       io.to(user.room).emit('message',format(user.username,msg))
    })
})


server.listen(port,()=>{
console.log(`listening on ${port}`)
})