const publishClick = ({ event, name = 'global.click' }) => {
  window.addEventListener('click', ({ target }) => {
    event.publish(name, { target })
  })
}

const publishEscape = ({ event, name = 'global.escape' }) => {
  window.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      event.publish(name)
    }
  })
}

export { publishClick, publishEscape }
