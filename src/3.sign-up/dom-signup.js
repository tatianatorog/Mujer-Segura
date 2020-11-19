import view from './signup.html';
import './estilos-signup-login.css';
import '../firebase-functions/firebaseConfig';
import { regularExpressions, fields, validateInputsValue } from './funciones-signup';
import { createNewUser, authGoogleAccount } from '../firebase-functions/firebaseAuth';

export default () => {
  const divElement = document.createElement('div');
  divElement.className = 'logged-out';
  divElement.innerHTML = view;

  const form = divElement.querySelector('#form');
  // querySelectorAll nos devuelve un array con cada uno de los inputs
  const inputs = divElement.querySelectorAll('#form input');

  const messageError = {
    name: 'El nombre debe contener solo letras.',
    email: 'El correo es inválido',
    password: 'La contraseña tiene que ser de 8 dígitos.',
  };

  const validateInputs = (regularExpressions, input, field) => {
    /* console.log(validateInputsValue(regularExpressions, input, field)); */
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
  // con target accedemos a la propiedad  name de cada input ()
  const validateForm = (e) => {
    switch (
      e.target.name // Valor a comprobar
    ) {
      case 'username':
        validateInputs(regularExpressions.name, e.target, 'name');
        break;
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

  // Por cada input del formulario me  ejecuta un eventlistener
  inputs.forEach(input => {
    input.addEventListener('blur', validateForm);
  });

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

  /* ------ SIGNUP (REGISTRARSE) -------*/
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se reinicie el form

    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password-input').value;
    const names = divElement.querySelector('#name').value;


    if (fields.name && fields.email && fields.password) {
      createNewUser(email, password, names);
      form.reset();
      /* window.location.hash = '#/login'; */
    } else {
      divElement
        .querySelector('#form-message')
        .classList.add('form-message-active');
    }
  });

  return divElement;
};
