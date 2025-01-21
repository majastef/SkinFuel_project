const socket = io()

const currentPath = window.location.pathname.split('/')[1]
const navBarLinks = document.querySelectorAll('.nav-bar a')

const filterButton = document.getElementById('filter')

navBarLinks.forEach(link => {
  // To remove '/' from a string
  const linkPath = link.getAttribute('href').split('/')[1]

  if (linkPath === currentPath) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})

filterButton.addEventListener('click', () => {
  const vegan = document.getElementById('non-vegan').value 
  const allergy = document.getElementById('allergy').value

  socket.emit('filter', vegan, allergy)
})