const name = localStorage.getItem('name');
const chatRoomCode = localStorage.getItem('chatRoomCode');
const content = document.getElementById('content')
const btn = document.getElementById('btn')
const contentContainer = document.getElementById('contentContainer')
const form = document.getElementById('form')
const inputImage = document.getElementById('inputImage')
let messageNum;
let firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
  };
  
  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  
  contentContainer.scrollTo(0, contentContainer.scrollHeight)

  form.addEventListener('submit',(e)=>{
    if(content.value!=""){
      e.preventDefault();
      let d = new Date();
      let date = d.toLocaleString();
      db.collection(chatRoomCode).get().then(snapshot => { //取得訊息數量
        messageNum = snapshot.size;
        db.collection(chatRoomCode)
      .doc(`${messageNum++}`)
      .set({
        content:content.value,
        name: name,
        time: date,
        number: messageNum++
    })
      .then(
        () => console.log('Document successfully written!'),
        contentContainer.innerHTML="",
        content.value ="",
        
      )
      .catch(error => console.error('Error writing document: ', error))
       })
      
    }else{
      e.preventDefault()
    }
  
  })

  //取得資料     
  db.collection(chatRoomCode).orderBy('number','asc').onSnapshot((querySnapshot) => {
    contentContainer.innerHTML=""
    querySnapshot.forEach((doc) => {
     let content = doc.data().content;
     let name = doc.data().name;
     let time = doc.data().time;
     addFromData(content,name,time)
    
    
     //addImgFromData(img,event)
     contentContainer.scrollTo(0, contentContainer.scrollHeight)
 });
 })

function addFromData(content,name,time){
  const contentLi = document.createElement('li');
  contentLi.id="contentLi"
  contentLi.innerHTML = `     
  <div id="infoContainer">
    <p id="infoName">${name}</p>
    <time id="time">${time}</time>
  </div>
  <p id="message">
    ${content}
  </p>
  
  `
  contentContainer.appendChild(contentLi)
}

function addToBoard(content,name){
  const contentLi = document.createElement('li');
  contentLi.innerHTML = `<li id="contentLi">${content.value} / ${name}</li>`
  contentContainer.appendChild(contentLi)
}