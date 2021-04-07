const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (event)=>{
  cursor.style.left = event.pageX + 'px';
  cursor.style.top = event.pageY + 'px';
  cursor.setAttribute('data-top', (cursor.offsetTop - scrollY));
});
window.addEventListener('scroll',()=> {
  const fromTop = parseInt(cursor.getAttribute('data-top'));
  cursor.style.top = scrollY + fromTop +  'px';
});
window.addEventListener('click', ()=>{
  if(cursor.classList.contains('click')){
    cursor.classList.remove('click');
    void cursor.offsetWidth;
    cursor.classList.add('click');
  }else{
    cursor.classList.add('click');
  }
});
