// set var
var body = document.body;
var navbar = document.getElementById('navbar');
var changeMode = document.getElementById('change-mode');
var aboutDescription = document.querySelector('#about-description');

// Check Last Mode

// night to day 
if (localStorage['nightMode'] === 'off') {
  changeMode.setAttribute('title', 'Set To Night Mode');
  changeMode.classList.replace('fa-sun', 'fa-moon');
  navbar.classList.replace('night-mode', 'bg-light');
  navbar.classList.replace('navbar-dark', 'navbar-light');
  body.classList.remove('night-mode');
  // day to night
} else if (localStorage['nightMode'] === 'on') {
  changeMode.setAttribute('title', 'Set To Day Mode');
  changeMode.classList.replace('fa-moon', 'fa-sun');
  navbar.classList.replace('bg-light', 'night-mode');
  navbar.classList.replace('navbar-light', 'navbar-dark');
  body.classList.add('night-mode');
}

// add event
changeMode.addEventListener('click', function () {
  // check last class name

  // activation night mode
  if (navbar.classList[1] == 'navbar-light') {
    navbar.classList.replace('bg-light', 'night-mode');
    navbar.classList.replace('navbar-light', 'navbar-dark');
    changeMode.classList.replace('fa-moon', 'fa-sun');
    changeMode.setAttribute('title', 'Set To Day Mode');
    navbar.classList.replace('navbar-light', 'navbar-dark');
    body.classList.add('night-mode');

    // set night mode to on
    localStorage['nightMode'] = 'on';

    // in-activated night mode
  } else if (navbar.classList[1] == 'navbar-dark') {

    navbar.classList.replace('night-mode', 'bg-light');
    navbar.classList.replace('navbar-dark', 'navbar-light');
    changeMode.setAttribute('title', 'Set To Night Mode');
    changeMode.classList.replace('fa-sun', 'fa-moon');
    body.classList.remove('night-mode');

    // set night mode to off
    localStorage['nightMode'] = 'off';
  }
});

// navigation bar
window.addEventListener('scroll', function () {

  if (window.pageYOffset >= 110) {
    navbar.classList.add('nav-scroll');
  } else if (window.pageYOffset <= 0) {
    navbar.classList.remove('nav-scroll');
  }
});

// custom typer
$("#typewriter-opening").typer({

  strings: [
    "Hallo !",
    "Selamat Datang!",
    "Saya Deri Kurniawan",
    "Saya Seorang Developer!"
  ],
  typeSpeed: 60,
  backspaceSpeed: 20,
  backspaceDelay: 800,
  repeatDelay: 500,
  repeat: true,
  autoStart: true,
  startDelay: 100,
});

var navLink = document.querySelectorAll('.nav-link');

switch (localStorage['currentPage'].toLowerCase()) {
  case 'home':
    navLink[0].classList.toggle('active');
    break;
  case 'timeline':
    navLink[1].classList.toggle('active');
    break;
  case 'about':
    navLink[2].classList.toggle('active');
    break;
  default:
    break;
}

localStorage.setItem('app-version', 1);