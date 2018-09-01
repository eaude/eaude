
module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  collectCoverageFrom: [
    '^.+\\.js$',
    '.*\\.(vue)$',
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}