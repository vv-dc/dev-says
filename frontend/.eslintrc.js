module.exports = {
    plugins: [
        "react"
    ],
    extends: [
        //"../eslintrc.base.js",
        "plugin:react/recommended"
    ],
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
    },
    settings: {
        react: {
          version: 'detect'
        }
    }
}
