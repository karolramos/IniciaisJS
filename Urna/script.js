let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4'); //do candidato
let aviso = document.querySelector('.d-2'); //tutorial
let lateral = document.querySelector('.d-1-right'); //imagens
let numeros = document.querySelector('.d-1-3'); //quadrados com os números dos candidatos

let etapaAtual = 0;
let numero = ''; //numero q to digitando no momento
let votoBranco = false;
let votos = [];


function comecarEtapa(){
  let etapa = etapas[etapaAtual];

  let numeroHtml = '';
  numero = '';//zera os num
  votoBranco = false; //zerando 
  
  for(let i = 0; i < etapa.numeros; i++){ //5vzs
    if(i === 0){ //se o quadrado n tiver preenchido ele vai colocar o pisca
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>'; //vai renderizar 5 quadradinhos de numeros de vereador na tela
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}



function atualizaInterface(){
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) =>{//recebo cada um dos candidatos.
    if(item.numero === numero){ //num do candidato é igual ao num do cand q eu digitei? Procurando candidato
      return true;
    } else {
      return false;
    }
  });
  if(candidato.length > 0) { //se achou algum candidato
    candidato = candidato[0];
    seuVotoPara.style.display = 'block'; //mostra o candidato na tela
    aviso.style.display = 'block'; //aparece o tutorial de como votar
    descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

    let fotosHtml = '';
    for(let i in candidato.fotos){ //percorrendo as fotos dos candidatos, um array
      if(candidato.fotos[i].small){ //foto do vice é pequena
        fotosHtml += `<div class="d-1-image small">
        <img src="images/${candidato.fotos[i].url}" alt="Ilustração" />${candidato.fotos[i].legenda} </div>`; 
      } else {
        fotosHtml += `<div class="d-1-image">
        <img src="images/${candidato.fotos[i].url}" alt="Ilustração" />${candidato.fotos[i].legenda} </div>`; 
      }
    } //exibindo a foto e a leganda correta do candi votado

    lateral.innerHTML = fotosHtml; //aparecer a foto na lateral
  } else { //n achou o cand, voto nulo
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

function clicou(n){
  let elNumero = document.querySelector('.numero.pisca');
  if(elNumero !== null){ // se for diferente eu posso preencher o numero
    elNumero.innerHTML = n;
    numero = `${numero}${n}`; //preencho o numero e ao lado o outro num

    elNumero.classList.remove('pisca'); //remove o pisca do q ta preenchido
    if(elNumero.nextElementSibling !== null){ //se for diferente qr dizer q existe um proximo item
      elNumero.nextElementSibling.classList.add('pisca'); //passando a classe pisca pro proximo quadrado n preenchido
    } else { //se eu ja tiver preenchido o ultimo item
      atualizaInterface(); //verifica o num q digitei, se tem algum cara com o num e pega as infos do cand e mostra na tela
    }
  }
}
function branco(){
  if(numero === ''){ //tem q ta tudo vazio
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = ''; //removendo os nums da tela
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = ''; //zera a fotinha
  } else {
    alert("Para votar em BRANCO, não pode ter digitado nenhum número!")
  }
}
function corrige(){
  comecarEtapa();
}
function confirma(){
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  if(votoBranco === true){
    votoConfirmado = true;
      votos.push({etapa: etapas[etapaAtual].titulo,
        voto: 'branco'
      }); //colocando os votos no array
  } else if(numero.length === etapa.numeros){ //tenho q ter digitado todos os nums(5)
    votoConfirmado = true;
    votos.push({etapa: etapas[etapaAtual].titulo,
      voto: numero
    }); //colocando os votos no array
  }

  if(votoConfirmado){
    etapaAtual ++;
    if(etapas[etapaAtual] !== undefined){
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
      console.log(votos);
    }
  }
}

comecarEtapa();