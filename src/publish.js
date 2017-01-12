const publishClick = ({ event, name = 'global.click' }) => {
  window.addEventListener('click', ({ target }) => {
    event.publish(name, { target })
  })
}

export { publishClick }
