import withStyles from '../../../src'

import { compose } from 'melody-hoc'
import { createComponent, RECEIVE_PROPS } from 'melody-component';
import { bindEvents } from 'melody-hoc';
import template from './index.twig';

const initialState = { count: 0 };

const INC = 'INC';
const DEC = 'DEC';

const increaseCounter = () => ({ type: INC });
const decreaseCounter = () => ({ type: DEC });

const stateReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_PROPS:
      return {
        ...state,
        ...action.payload
      };
    case INC:
      return {
        ...state,
        count: state.count + 1
      };

    case DEC:
      return {
        ...state,
        count: state.count - 1
      };
  }
  return state;
}

const withClickHandlers = bindEvents({
  incrementButton: {
    click(event, {dispatch}) {
      dispatch(increaseCounter())
    }
  },
  decrementButton: {
    click(event, {dispatch}) {
      dispatch(decreaseCounter());
    }
  }
});

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
  withClickHandlers
)(component)
