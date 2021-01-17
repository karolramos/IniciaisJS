function slideStories(id){
    this.slide = document.querySelector(`[data-slide="${id}"]`); //pegando a div principal
    this.active = 0;
    this.init();
}
 function activeSlide(index) {
    this.active = index;
    this.items.forEach((item) => item.classList.remove('active'));
    this.items[index].classList.add('active');
    this.thumbItems.forEach((item) => item.classList.remove('active'));
    this.thumbItems[index].classList.add('active');
    this.autoSlide();
  }

function prev() { // o slide ativo -1
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

 function next() { //o slide ativo + 1
    if (this.active < this.items.length - 1) { //temos 4 imgs, mas o indice começa em 0, então 4-1= 3. 0 1 2 3
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
  }

 function addNavigation() {
    const nextBtn = this.slide.querySelector('.slide-next');
    const prevBtn = this.slide.querySelector('.slide-prev');
    nextBtn.addEventListener('click', this.next);
    prevBtn.addEventListener('click', this.prev);
  }

function  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }

function  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 5000);
}

function init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll('.slide-items > *'); //todos os elementos que estao dentro de .slide-items
    this.thumb = this.slide.querySelector('.slide-thumb');
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }

slideStories('slide');
