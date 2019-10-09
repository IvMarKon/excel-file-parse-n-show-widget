module.exports = {
  presets: ['env', '@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'add-module-exports'
  ]
};
