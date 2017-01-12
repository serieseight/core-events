# Core Events

A simple publish/subscribe pattern

- Plain old vanilla JS
- Just 0.6kb gzipped

## Installation

```
npm install core-events
```

## Usage

```js
import Event from 'core-events'

const event = new Event()

event.subscribe('createWorld', () => {
  console.log('hello world')
})

event.publish('createWorld')
```

A slightly more complex example:

```js
import Event from 'core-events'

const event = new Event()

const token = event.subscribe('personBorn', ({ name }) => {
  console.log(`hello ${name}`)
})

event.publish('personBorn', {
  'name': 'Colin'
})

event.unsubscribe(token)
```

### Global events

Core Events also provides some handy functions to publish events
when a global event occurs.

#### Click

```js
import Event, { globalClick } from 'core-events'

const event = new Event()

globalClick({ event })

event.subscribe('global.click', ({ target }) => {
  console.log(target, 'clicked')
})
```

## Browser support

Core Events is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Core Events to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `Event`.
