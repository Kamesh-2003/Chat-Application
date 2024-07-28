const socket= io('http://localhost:8000');
//Get DOM variables in respective JS variables
const form= document.getElementById('send-container');
const messageInp=document.getElementById('messagein')
const messageContainer= document.querySelector(".container")
//Plays audio when msg recieved
//var audio=new Audio('oye.mp3');

//Function which append info the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}
//If form gets submitted ,the server the msg
form.addEventListener('submit',(e)=>
{
 e.preventDefault();
 const message=messageInp.value;
 append(`You: ${message}`,'right');
 socket.emit('send',message);
 messageInp.value='';
})
//Ask new user for his name and let the server know
const name=prompt("Enter your Name to join");
socket.emit('new-user-joined',name)
//If new user joins,recieve his name from the server 
socket.on('user-joined',data=>{
    append(`${name} joined the chat`,'right')
})
//If server sends a msg,recieve it
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})
//If user lefts the chat,append the info to the container
socket.on('left',data=>{
    append(`${name} left the chat`,'right')
})