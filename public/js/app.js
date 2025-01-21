const currentPath = window.location.pathname.split('/')[1]
const navBarLinks = document.querySelectorAll('.nav-bar a')

navBarLinks.forEach(link => {
  // To remove '/' from a string
  const linkPath = link.getAttribute('href').split('/')[1]

  if (linkPath === currentPath) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})