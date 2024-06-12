import bot from './assets/bot.svg'
import user from './assets/user.svg'

const chatContainer = document.querySelector('#chat_container');
const chatForm = document.querySelector('#chat_form');
const messageContainer = document.querySelector('#message_container');

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }

        // to focus scroll to the bottom
        element.scrollTop = element.scrollHeight;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(chatForm)

    // user's chatstripe
    messageContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    chatForm.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    messageContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    messageContainer.scrollTop = messageContainer.scrollHeight; 

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const token = localStorage.getItem('jwtToken');
    const response = await fetch("https://openaiserverlwt.azurewebsites.net",{
    //const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.status === 401 || response.status === 403) {
      const loginContainer = document.getElementById("login_container");
      loginContainer.style.display = "block";

      chatContainer.style.display = 'none';

      messageContainer.innerHTML = ''; //clean the previous chat contents and token
      localStorage.removeItem('jwtToken');
    } else if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        typeText(messageDiv, parsedData);
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

// Event listener for chat form submission
chatForm.addEventListener('submit', handleSubmit);
chatForm.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
      handleSubmit(e)
  }
})

