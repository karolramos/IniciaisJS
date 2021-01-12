//galeria

let imagens = document.querySelectorAll('.small_img');
let modal = document.querySelector('.md');
let modalImg = document.querySelector('#md_img');
let btClose = document.querySelector('#bt_close');
let srcVal = "";

for (let i = 0; i < imagens.length; i++) {
  imagens[i].addEventListener('click', function () {

    srcVal = imagens[i].getAttribute('src');
    modalImg.setAttribute('src', srcVal);
    modal.classList.toggle('modal_active');
  });
}
btClose.addEventListener('click', function () {
  modal.classList.toggle('modal_active');
});


//filtro

const duration = 300;

function filterAnimals(animal) {
  $('[data-animal]').each(function (index, el) { //pra cada animal q eu encontrar
    const isTarget = $(this).attr('data-animal') === animal || animal === null;
    if (isTarget) {
      $(this).parent().removeClass('d-none');
      $(this).fadeIn(duration);
    } else {
      $(this).fadeOut(duration, () => {
        $(this).parent().addClass('d-none');
      });

    }
  });
}

const animalButtons = $('[data-animal-buttons]');

const animals = new Set;
$('[data-animal]').each(function (index, el) {
  animals.add($(el).attr('data-animal'));
});

const btns = Array.from(animals).map(animal => {
  const btn = $('<button>').addClass(['btn']).html(animal);
  btn.click(e => filterAnimals(animal));
  return btn;
});

const btnAll = $('<button>').addClass(['btn']).html('Todos'); // 'active'
btnAll.click(e => filterAnimals(null));
btns.push(btnAll);

const btnGroup = $('<div>').addClass(['btn-group']);
btnGroup.append(btns);

animalButtons.html(btnGroup);

$(document).on('click', 'button', function () {
  $(this).addClass('active').siblings().removeClass('active');
});

// const todosB = document.querySelectorAll('.btn');
// todosB.forEach(button => {
//  button.addEventListener('click', function () {
//   todosB.forEach(btn => btn.classList.remove('active'));
//   this.classList.add('active');
//  });
// });