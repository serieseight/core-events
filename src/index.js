import { publishClick, publishEscape } from './publish'

const _ = new WeakMap()

class Event {
  constructor () {
    const props = {
      token: 0,
      subs: []
    }

    _.set(this, props)
  }

  publish (name, data = {}) {
    const { subs } = _.get(this)

    for (let i = 0; i < subs.length; i++) {
      if (name === subs[ i ].name) {
        subs[ i ].callback.call(null, data)
      }
    }
  }

  subscribe (name, callback) {
    const token = _.get(this).token++

    _.get(this).subs.push({
      'token': token,
      'name': name,
      'callback': callback
    })

    return token
  }

  unsubscribe (token) {
    const { subs } = _.get(this)

    for (let i = 0; i < subs.length; i++) {
      if (token === subs[ i ].token) {
        subs.splice(i, 1)
        i--
      }
    }
  }
}

export { publishClick, publishEscape }

export default Event
