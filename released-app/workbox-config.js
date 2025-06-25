module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,svg,json}'
  ],
  swDest: 'build/sw.js',
  clientsClaim: true,
  skipWaiting: true
};
