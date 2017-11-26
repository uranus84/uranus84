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
      "react/no-array-index-key": "off",
      "no-underscore-dangle": "off",
      "arrow-body-style": "off",
      "no-script-url": "off",
      "consistent-return": "off",
      "no-path-concat": "off",
      "object-curly-newline": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
    }
};