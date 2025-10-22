// sd.config.cjs
module.exports = {
  source: ['design/tokens/base.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/scss/base/',
      files: [{ destination: '_variables.scss', format: 'scss/variables' }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: true }
        },
        // dark-mode overrides scoped under data-mode
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
