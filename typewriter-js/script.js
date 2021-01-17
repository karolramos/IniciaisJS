function typeWriter(elemento) {
  const textoArray = elemento.innerHTML.split(''); //pegando cada letra e colocando dentro de um array e separando com split cada letra.
  elemento.innerHTML = ''; //limpando o texto p ele começar qndo a func for iniciada
  textoArray.forEach((letra, i) => { //percorrendo cada letra
    setTimeout(() => elemento.innerHTML += letra, 75 * i); //colocando de letra em letra com intervalo 
  });
}

// Se estiver tendo problemas com performance, utilize o FOR loop como abaixo no local do forEach
// function typeWriter(elemento) {
//   const textoArray = elemento.innerHTML.split('');
//   elemento.innerHTML = '';
//   for(let i = 0; i < textoArray.length; i++) {
//     setTimeout(() => elemento.innerHTML += textoArray[i], 75 * i);
//   }
// }

const titulo = document.querySelector('h1'); //pegando o h1 completo
typeWriter(titulo);