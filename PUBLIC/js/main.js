const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-log');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get usernname url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//chat e katıl
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);


    // bana ait
    document.getElementById('msg').value = "";
    document.getElementById('msg').focus();
});

//output message to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);

};

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

