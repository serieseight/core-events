# Core Events

A simple publish/subscribe pattern

- Plain old vanilla JS
- Just 1.2kb gzipped

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
import Event, { publishClick } from 'core-events'

const event = new Event()

publishClick({ event })

event.subscribe('global.click', ({ target }) => {
  console.log('Somebody clicked on', target)
})
```

#### Escape

```js
import Event, { publishEscape } from 'core-events'

const event = new Event()

publishEscape({ event })

event.subscribe('global.escape', () => {
  console.log('Somebody hit escape')
})
```

#### Resize

```js
import Event, { publishResize } from 'core-events'

const event = new Event()

publishResize({ event })

event.subscribe('global.resize', () => {
  console.log(`Somebody resizes the browser`)
})
```

#### Scroll

```js
import Event, { publishScroll } from 'core-events'

const event = new Event()

publishScroll({ event })

event.subscribe('global.scroll', ({ direction, speed }) => {
  console.log(`Somebody scrolled ${direction} at ${speed} px per ms`)
})
```

#### Swipe

```js
import Event, { publishSwipe } from 'core-events'

const event = new Event()

publishSwipe({ event, sensitivity: { x: 10, y: 50 } })

event.subscribe('global.swipe', ({ direction, target }) => {
  console.log(`Somebody swiped ${direction} on`, target)
})
```

## Browser support

Core Events is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Core Events to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `Event`.
