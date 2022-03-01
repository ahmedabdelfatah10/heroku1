const form=document.querySelector('#chat-form')
const chatmessages=document.querySelector('.chat-messages');
const roomname=document.querySelector('#room-name')
const userslist=document.querySelector('#users');




const socket=io();
socket.on('message',data=>{
   outputMessage(data);

   chatmessages.scrollTop=chatmessages.scrollHeight;

})

const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

socket.emit('joinroom',{username,room})

form.addEventListener('submit',(e)=>{
    e.preventDefault();


    const msg=e.target.elements.msg.value;

    socket.emit('send',msg)
    e.target.elements.msg.value=''
    e.target.elements.msg.focus();

})

function outputMessage(msg){
    const div=document.createElement('div');
    div.classList.add('message');
 div.innerHTML=`
 <p class="meta">${msg.username} <span>${msg.time}</span></p>
 <p class="text">
    ${msg.text}
 </p>
 `
 document.querySelector('.chat-messages').appendChild(div);

}

socket.on('roomusers',({room,users})=>{
  
    outputRoom(room);
    outputUsers(users);
})
function outputRoom(room){
    roomname.textContent=room
}
function outputUsers(userList){
   
   userslist.innerHTML= `${userList.map(user=> `<li>${user.username}</li>`).join('')}`
}