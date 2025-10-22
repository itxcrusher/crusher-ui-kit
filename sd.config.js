// sd.config.js (ESM)
export default {
  source: ['design/tokens/base.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/scss/base/',
      prefix: 'crusher',
      files: [{ destination: '_variables.scss', format: 'scss/variables' }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/css/',
      prefix: 'crusher',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: true }
        },
        {
          destination: 'modes.css',
          format: 'css/variables',
          options: { selector: 'html[data-mode="dark"]', outputReferences: true },
          filter: (token) => token.path[0] === 'color' && token.path[1] === 'dark'
        }
      ]
    }
  }
};
