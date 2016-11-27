import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'coreEvents',
  plugins: [
    babel()
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.dest = 'dist/core-events.min.js'
  config.plugins.push(uglify())
} else {
  config.dest = 'dist/core-events.js'
}

export default config
