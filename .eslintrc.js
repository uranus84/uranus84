module.exports = {
    "extends": [
      "airbnb",
      "plugin:react/recommended"
    ],
    "plugins": [
      "jest",
      "react"
    ],
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "es6": true,
      "browser": true,
      "node": true,
      "mocha": true,
      "jest/globals": true
    }, 
    "rules": {
      "import/extensions": "off",
      "react/prop-types": "off",
      "react/forbid-prop-types": "off",
      "react/no-array-index-key": "off"
    }
};