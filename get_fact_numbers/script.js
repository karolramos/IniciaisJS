const form  = document.querySelector('form');
const numberFact = document.querySelector('.number-fact');

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  var number = event.target.querySelector('input[type="number"]').value;
  var loadText = 'looking for fact...🕵️‍♀️'
  numberFact.innerHTML = loadText;
  
  const URL = 'http://numbersapi.com/';
  fetch(URL + number)
    .then(response => response.text())
    .then(text => numberFact.innerHTML = text);
});