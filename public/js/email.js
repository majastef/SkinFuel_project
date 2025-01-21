const sendEmail = document.getElementById('send-email-button')

sendEmail.addEventListener("click", () => {
  const email = document.getElementById('email').value
  const content = document.getElementById('content').value

  if (email && content) {
    socket.emit('send-email', email, content)
  } else if (email && !content) {
    window-alert('Please enter some text!')
  } else if (!email && content) {
    window-alert('Please enter email!')
  } else {
    window.alert('Please fill all the fields!')
  }
})