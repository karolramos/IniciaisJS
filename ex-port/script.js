const responsiveBtn = document.getElementById('responsive');
const navbar = document.getElementById('navbar');


function toggleButton(){
  navbar.classList.toggle('show');
}

responsiveBtn.addEventListener('click', toggleButton);

