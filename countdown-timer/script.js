const seconds = 1000;
const mins = seconds * 60;//60000
const hours = mins * 60; //3600000
const days = hours * 24; //86400000


let newYears = new Date('01/01/2022 00:00:00').getTime();

function countDown() {
  let now = new Date();
  let diff = newYears - now;

  document.getElementById('days').innerText = Math.floor(diff / days); // diff / 86400000
  document.getElementById('hours').innerText = Math.floor(diff % days / hours);//ex diff % 86400000 / 3600000
  document.getElementById('mins').innerText = Math.floor(diff % hours / mins);
  document.getElementById('seconds').innerText = Math.floor(diff % mins / seconds);
}

setInterval(countDown, seconds);