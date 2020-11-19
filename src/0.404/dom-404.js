import view from './404.html';
import './estilos-404.css';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
