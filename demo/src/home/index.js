import withStyles from '../../../src'

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