import view from './login.html';
import {regularExpressions, fields, validateInputsValue} from '../3.sign-up/funciones-signup';
import {loginUser /* authGoogleAccount */} from '../firebase-functions/firebaseAuth';

export default () => {
  const divElement = document.createElement('div');
  divElement.className = 'logged-out';
  divElement.innerHTML = view;

  const form = divElement.querySelector('#form');
  const inputs = divElement.querySelectorAll('#form input');
  // console.log(inputs)

  const messageError = {
    email: 'El correo es inválido',
    password: 'La contraseña tiene que ser de 8 dígitos.',
  };

  /* ------ VALIDACIÓN INPUTS FORMULARIO -------*/
  const validateInputs = (regularExpressions, input, field) => {
    // console.log(validateInputsValue(regularExpressions, input, field));
    if (validateInputsValue(regularExpressions, input, field)) {
      divElement
        .querySelector(`#${field}`)
        .classList.remove('form-group-wrong');
      divElement.querySelector(
        `#group-${field} .form-input-error`,
      ).textContent = '';
    } else {
      divElement.querySelector(`#${field}`).classList.add('form-group-wrong');
      divElement.querySelector(
        `#group-${field} .form-input-error`,
      ).textContent = messageError[field];
    }
  };

  const validateForm = (e) => {
    switch (e.target.name) {
      case 'email':
        validateInputs(regularExpressions.email, e.target, 'email');
        break;
      case 'password':
        validateInputs(regularExpressions.password, e.target, 'password');
        break;
      default:
        '';
    }
  };

  // Por cada input del formulario ejecuta un eventlistener
  inputs.forEach((input) => {
    input.addEventListener('blur', validateForm);
  });

  /* ------ OCULTAR/MOSTRAR CONTRASEÑA -------*/
  const togglePassword1 = () => {
    const pwd = divElement.querySelector('#password-input');
    const eyeOpen = divElement.querySelector('#eye-open');
    const eyeClose = divElement.querySelector('#eye-close');

    if (pwd.type === 'password') {
      pwd.type = 'text';
      eyeOpen.style.display = 'block';
      eyeClose.style.display = 'none';
    } else {
      pwd.type = 'password';
      eyeOpen.style.display = 'none';
      eyeClose.style.display = 'block';
    }
  };

  const eyeIcons = divElement.querySelector('.eye');
  eyeIcons.addEventListener('click', togglePassword1);

  /* ------ lOGIN -------*/
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se reinicie el form

    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password-input').value;

    if (fields.email && fields.password) {
      loginUser(email, password);
      form.reset();
    } else {
      divElement
        .querySelector('#form-message')
        .classList.add('form-message-active');
    }
  });
  
  /* ------ SIGNUP (REGISTRARSE) GOOGLE -------*/
  /* const googleButtonSignUp = divElement.querySelector('#sign-in-google');

  googleButtonSignUp.addEventListener('click', (e) => {
    authGoogleAccount();
  });*/

  return divElement;
};