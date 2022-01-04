import ColorPicker from './color-picker.js'


(()=> {
  const colorPicker = new ColorPicker()
  colorPicker.bind() 

  if (typeof globalThis.addEventListener === 'function') {
    globalThis.addEventListener(
      'unload',
      (evt) => {
        colorPicker.unbind()
      }, {
        once: true
      })
  }
})()

// vi: se ts=2 sw=2 et:
