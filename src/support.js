let testedPassiveSupport = false
let passive = false

const testPassiveSupport = () => {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        passive = true
      }
    })

    window.addEventListener('test', null, opts)
  } catch (e) {}
}

const supportsPassive = () => {
  if (!testedPassiveSupport) {
    testPassiveSupport()
    testedPassiveSupport = true
  }

  return passive
}

export { supportsPassive }
