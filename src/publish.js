import { supportsPassive } from './support'

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

const publishScroll = ({ event, limit = 10, name = 'global.scroll' }) => {
  let lastPosition = 0
  let lastTime = 0

  window.addEventListener('scroll', () => {
    const currentPosition = window.scrollY
    const currentTime = Date.now()
    const time = currentTime - lastTime

    if (lastTime && time >= limit) {
      const direction = currentPosition > lastPosition ? 'down' : 'up'
      const distance = Math.abs(lastPosition - currentPosition)
      const speed = distance / time

      event.publish(name, { direction, speed })
    }

    lastTime = currentTime
    lastPosition = currentPosition
  })
}

const publishSwipe = ({
  event,
  name = 'global.swipe',
  sensitivity = { x: 10, y: 10 }
}) => {
  let swipeStarted = false
  let swipeTarget = null
  let swipeStartX = null
  let swipeStartY = null

  const swipeStart = e => {
    swipeStarted = true
    swipeTarget = e.target
    swipeStartX = e.screenX
    swipeStartY = e.screenY
  }

  const swipeEnd = e => {
    if (swipeStarted) {
      if (Math.abs(e.screenX - swipeStartX) >= sensitivity.x) {
        e.screenX < swipeStartX
          ? event.publish(name, { direction: 'left', target: swipeTarget })
          : event.publish(name, { direction: 'right', target: swipeTarget })
      }

      if (Math.abs(e.screenY - swipeStartY) >= sensitivity.y) {
        e.screenY < swipeStartY
          ? event.publish(name, { direction: 'up', target: swipeTarget })
          : event.publish(name, { direction: 'down', target: swipeTarget })
      }

      swipeStarted = false
      swipeTarget = null
      swipeStartX = null
      swipeStartY = null
    }
  }

  window.addEventListener('touchstart', e => {
    swipeStart(e.changedTouches[ 0 ])
  }, supportsPassive ? { passive: true } : false)

  window.addEventListener('touchend', e => {
    swipeEnd(e.changedTouches[ 0 ])
  }, supportsPassive ? { passive: true } : false)

  window.addEventListener('mousedown', e => swipeStart(e))

  window.addEventListener('mouseup', e => swipeEnd(e))
}

export { publishClick, publishEscape, publishScroll, publishSwipe }
