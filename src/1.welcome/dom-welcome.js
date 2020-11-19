import view from './welcome.html';
import './estilos-welcome.css';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  window.addEventListener('load', () => {
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 7000);
  });

  return divElement;
};
