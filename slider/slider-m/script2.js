let totalImgs = document.querySelectorAll('.slider-item').length; //pegando o total de imagens
let currentSlide = 0; //começando pelo slide 0

let sliderWidth = document.querySelector('.slider').clientWidth;

document.querySelector('.slider-width').style.width = 
  `${sliderWidth * totalImgs}px`;

document.querySelector('.slider-controls').style.width = 
  `${sliderWidth}px`;
document.querySelector('.slider-controls').style.height = 
  `${document.querySelector('.slider').clientHeight}px`;



function goPrev(){
  currentSlide--;
  if(currentSlide < 0){
    currentSlide = totalImgs -1; //tenho quatro o ultimo slide vai ser o 3
  }
  updateMargin();
}

function goNext(){
  currentSlide++;
  if(currentSlide >(totalImgs -1)){
    currentSlide = 0;
  }
  updateMargin();
}
function updateMargin(){
  let sliderItemWidth = document.querySelector('.slider-item').clientWidth;
  let newMargin = (currentSlide * sliderItemWidth);
  document.querySelector('.slider-width').style.marginLeft = 
    `-${newMargin}px`;
}
setInterval(goNext, 5000);