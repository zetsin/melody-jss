import { compose, withStore, lifecycle } from 'melody-hoc'
import { createStore } from 'redux'
import Styles from './styles'
import classnames from './classnames'
import { onChange } from './theme'

const TYPE = 'WITHSTYLES/RECEIVE_PROPS'
const stateReducer = (state, action) => {
  switch (action.type) {
    case TYPE: {
      return {
        ...state,
        ...action.payload
      }
    }
  }
  return state;
}
const save = payload => ({
  type: TYPE,
  payload
})

export default function withStyle(stylesOrCreator, options = {}) {
  return ChildComponent => {
    const StylesInstance = new Styles(stylesOrCreator, {
      ...options,
      classNamePrefix: process.env.NODE_ENV === 'production' ? undefined : ChildComponent.prototype.displayName
    })
    return compose(
      withStore(() => createStore(stateReducer, StylesInstance.getStaticSheet().classes), 'classes'),
      lifecycle({
        componentDidInitialize() {
          onChange(theme => {
            if(this.dynamicSheet) {
              this.dynamicSheet.detach()
            }

            const staticSheet = StylesInstance.getStaticSheet()
            this.dynamicSheet = StylesInstance.getDynamicSheet(this)
            this.props.dispatch(save(classnames(staticSheet.classes, this.dynamicSheet.classes)))
          })
        },
        componentDidMount() {
          this.dynamicSheet = StylesInstance.getDynamicSheet(this)
          if(this.dynamicSheet.classes) {
            this.props.dispatch(save(classnames(this.props.classes, this.dynamicSheet.classes)))
          }
        },
        componentDidUpdate() {
          if(this.dynamicSheet) {
            this.dynamicSheet.update(this).attach()
          }
        },
      }),
    )(ChildComponent)
  }
}
