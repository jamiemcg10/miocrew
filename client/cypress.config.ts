import { defineConfig } from 'cypress'
import webpackConfig from './cypress/webpack.config.js'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    },
    supportFile: 'cypress/support/component.ts'
  }
})
