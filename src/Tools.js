class Tools {
  /*
  from https://stackoverflow.com/questions/11444838/getting-wrong-screen-height-when-trigger-orientationchange-event?lq=1
  the resize event gets triggered after the 'orientationchange' event
  and the viewport dimensions are not updated until the 'resize' event
  */
  static addOrientationChangeEventListener(func) {
    window.addEventListener('orientationchange', () => {
      const onOrientationChange = () => {
        func()
        window.removeEventListener('resize', onOrientationChange)
      }
      window.addEventListener('resize', onOrientationChange)
    })
  }
}

export default Tools
