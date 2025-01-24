const socket = io()

const currentPath = window.location.pathname.split('/')[1]
const navBarLinks = document.querySelectorAll('.nav-bar a')

const mealsFilterButton = document.getElementById('meals-filter')
const juicesFilterButton = document.getElementById('juices-filter')
const removeMealFilters = document.getElementById('remove-meal-filters')
const removeJuiceFilters = document.getElementById('remove-juice-filters')

navBarLinks.forEach(link => {
  // To remove '/' from a string
  const linkPath = link.getAttribute('href').split('/')[1]

  if (linkPath === currentPath) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})

if (mealsFilterButton) {
  mealsFilterButton.addEventListener('click', () => {
    const vegan = document.getElementById('vegan').value 
    const allergy = document.getElementById('allergy').value
  
    socket.emit('meals-filter', vegan, allergy)
  })
}

if (removeMealFilters) {
  removeMealFilters.addEventListener('click', () => {
    const vegan = document.getElementById('vegan').value 
    const allergy = document.getElementById('allergy').value
  
    socket.emit('meals-filter', vegan, allergy)
  })
}

if (juicesFilterButton) {
  juicesFilterButton.addEventListener('click', () => {
    const diet = document.getElementById('diet').value
    
    socket.emit('juices-filter', diet)
  })
}

if (removeJuiceFilters) {
  removeJuiceFilters.addEventListener('click', () => {
    const diet = document.getElementById('diet').value
    
    socket.emit('juices-filter', diet)
  })
}