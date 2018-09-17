import { render } from 'melody-component';
import { setTheme } from '../../src'

import home from './home';

setTheme({
  color: 'green',
  spacing: {
    unit: 8
  }
})

const documentRoot = document.querySelector('#demo');
render(documentRoot, home, {
    message: 'Welcome to Melody!'
});