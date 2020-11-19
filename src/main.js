import { router } from './router/index.routes.js';
import './main.css';

router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash);
});
