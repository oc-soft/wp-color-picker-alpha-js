import jQuery from 'jquery'
import ImageResource from 'image-resource-js'

const ColorPickerExtension = {
  /**
   * Get the alpha options.
   *
   * @since 3.0.0
   * @access private
   *
   * @return {object} The current alpha options.
   */
  _createAlphaOptions: function() {
    const el = this.element
    const type  = ( el.data( 'type' ) || this.options.type )
    const options = {
      alphaEnabled: ( el.data( 'alphaEnabled' ) || false )
    }
    if ( options.alphaEnabled ) {
      options.alphaEnabled = ( el.is( 'input' ) && 'full' === type )
    }
    return options;
  },


  /**
   * create color picker change listener 
   */
  _createChangeListener: function() {

    const originalChange = this.option('change')

    const self = this
    return function(event, ui) {
      self.syncTogglerWithColor()
      if (typeof originalChange === 'function') {
        originalChange.call(this, event, ui)
      }
    }
  },

  /**
   * Create widget
   *
   * @since 3.0.0
   * @access private
   *
   * @return {void}
   */
  _create: function() {
    if (jQuery.support.iris ) {
      const alphaOpt = this._createAlphaOptions()
      this.option('change', this._createChangeListener())

      this._super()
      const iris = this.element.iris('instance')
      if (iris) {
        for (const key in alphaOpt) {
          
          iris.option(key, alphaOpt[key])
        }
        iris.attachAlphaSlider()
      }
      this.syncTogglerWithColor()
    } else {
      this._super()
    }
  },

  /**
   * synchronize toggler style with current color setting
   */
  syncTogglerWithColor: function() {

    if (this.option('alphaEnabled')) {
      const iris = this.element.iris('instance')
      const color = iris.color(true)

      const gradient = [
        color.toCSS('rgba'), color.toCSS('rgba')
      ]
      const gradientStr = `linear-gradient(${gradient.join()})`
      const bgImage = `url(${ImageResource.checker16DataImage})` 
       
      const cssOption = {
        backgroundImage: [gradientStr, bgImage].join(),
        backgroundRepeat: 'repeat, repeat',
        backgroundPosition: 'center, center'
      }
      this.toggler.css(cssOption)
    }
  },
  /**
   * Binds event listeners to the color picker and create options, etc...
   *
   * @since 3.0.0
   * @access private
   *
   * @return {void}
   */
  _addListeners: function() {
    this._super()
    if (this.option('alphaEnabled') ) {
      const self = this
      const el = self.element
    }
  }
}



/**
 * extend wordpress color picker 
 */
class ColorPicker {


  /**
   * extend wordpress color picker
   */
  bind() {

    jQuery.widget(
      'wp.wpColorPicker', 
      jQuery.wp.wpColorPicker, ColorPickerExtension)
  }


  /**
   * restore wordpress color picker
   */
  unbind() {
  }
}

export { ColorPicker as default }

// vi: se ts=2 sw=2 et:
