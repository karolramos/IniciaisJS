let Validator = {
  handleSubmit:(event) =>{
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll('input');

    Validator.clearErrors();

    for(let i = 0; i < inputs.length; i++){
      let input = inputs[i];
      let check = Validator.checkInput(input);
      if(check !== true){
        send = false;
        Validator.showError(input, check);
      }
    }

    if(send){
      form.submit();
    }
  },
  checkInput:(input) => {
    let rules = input.getAttribute('data-rules');
    if(rules !== null) {
      rules = rules.split('|');
      for(let k in rules){
        let rulesDatails = rules[k].split('=');
        switch(rulesDatails[0]){
          case 'required':
            if(input.value == ''){
              return 'Este campo é obrigatório.';
            }
          break;
          case 'min':
            if(input.value.length < rulesDatails[1]){
              return 'Campo tem que ter pelo menos '+rulesDatails[1]+' caracteres.';
            }
          break;
        }
      }
    }
    return true;
  },
  showError:(input, error) => {
    input.style.borderColor = 'red';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling); //inserindo a msg de erro abaixo do campo input
  },
  clearErrors:()=> {
    let inputs = form.querySelectorAll('input');
    for(let i = 0; i < inputs.length; i++){
      inputs[i].style = ''; //removendo a borda vermelha qndo sair o erro
    }

    let errorElements = document.querySelectorAll('.error');
    for(let i = 0; i<errorElements.length; i++){
      errorElement[i].remove();
    }
  }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);