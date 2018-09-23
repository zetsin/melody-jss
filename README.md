# melody-jss
[jss](https://github.com/cssinjs/jss) integration for Melody

## Install
```
npm install --save melody-jss
```
```
yarn add melody-jss
```

## Usage

### Basic
```javascript
import withStyles from 'melody-jss'

import { compose } from 'melody-hoc'
import { createComponent } from 'melody-component'
import template from './index.twig'

const styles = {
  test1: {
    color: 'red',
    fontSize: 25
  },
  test2: {
    color: 'yellow',
    fontSize: 25
  },
}

export default compose(
  withStyles(styles)
)(createComponent(template))
```

```twig
<div>
    <h1 class="{{classes.test1}}">
        {{ message }}
    </h1>
</div>
```

### Theme
```javascript
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
```
```
import withStyles from '../../../src'

import { compose } from 'melody-hoc'
import template from './index.twig';

const styles = theme => ({
  test1: {
    color: [theme.color, '!important'],
    fontSize: component => component.state.count * 10 * theme.spacing.unit
  },
  test2: {
    color: 'blue'
  },
})

const component = createComponent(template, stateReducer);

export default compose(
  withStyles(styles),
)(component)

```
