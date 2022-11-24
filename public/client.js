

const socket = io()

let name;

let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message_area')

do{

 name =  prompt("Please enter your name : ");

}while(!name)


textarea.addEventListener('keyup' , (e) =>{
    if(e.key === 'Enter'){

      sendMessage(e.target.value);
    }
})

function sendMessage(message){
     let msg = {
      time : formatAMPM(new Date),  
      user : name,
      message: message.trim()     //trim the white spaces
      
     }

     //append message
     appendMessage(msg,'outgoing')
     textarea.value = '';
     scrollToBottom()

     //send to server
    //  socket.EventEmitter('message',msg)
    socket.emit('message',msg);

}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

     
//creating an outgoing function

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')     // div = incoming or outgoing 
    let className = type                             //className  =  incoming or outgoing 
    mainDiv.classList.add(className, 'message')       //className  is dynamic

    let markup = `
         <span>${msg.time}</span>
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
       
         `
       mainDiv.innerHTML = markup  
       messageArea.appendChild(mainDiv);

}

//receive messages

socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
   scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}



// -----function for light and dark mode--------------

function myfunction(){
    var element = document.body; 
    element.classList.toggle('light-mode')

 }

 function changeImage(){
    var image =  document.getElementById("icon");
    if(image.src.match("/sun.png")){
     image.src = "/moon.png";
    }
    else{
     image.src = "/sun.png";
    }
 }

