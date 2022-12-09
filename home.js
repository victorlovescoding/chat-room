const nameEl = document.getElementById('name')
const chatRoomCode = document.getElementById('chatRoomCode')
const btn = document.getElementById('btn')

btn.addEventListener('click',()=>{
    localStorage.setItem('name', nameEl.value);
    localStorage.setItem('chatRoomCode',chatRoomCode.value);
})

