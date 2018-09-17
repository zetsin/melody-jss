import { getTheme, onChange } from './theme'
import jss, { SheetsManager, getDynamicStyles } from './jss'
const manager = new SheetsManager()

export default class Styles {
  constructor(stylesOrCreator, options) {
    this.stylesOrCreator = stylesOrCreator
    this.options = options

    this.styles = this.getStyles()

    onChange(theme => {
      const styles = this.getStyles()
      const staticSheet = manager.get(styles)
      if(!staticSheet) {
        if(manager.get(this.styles)) {
          manager.unmanage(styles)
        }
        this.styles = styles
      }
    })
  }
  getStyles() {
    if (typeof this.stylesOrCreator !== 'function') {
      return this.stylesOrCreator
    }
    return this.stylesOrCreator(getTheme())
  }
  getStaticSheet() {
    let staticSheet = manager.get(this.styles)
    if(!staticSheet) {
      staticSheet = jss.createStyleSheet(this.styles, this.options)
      manager.add(this.styles, staticSheet)
      manager.manage(this.styles)
    }
    return staticSheet
  }
  getDynamicSheet(comp) {
    let dynamicSheet = {}
    const dynamicStyles = getDynamicStyles(this.styles)
    if(dynamicStyles) {
      dynamicSheet = jss.createStyleSheet(dynamicStyles, {
        ...this.options,
        link: true
      })
      dynamicSheet.update(comp).attach()
    }
    return dynamicSheet
  }
}
