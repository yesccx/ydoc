module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': 'off',
        'semi': ['error', 'always'],
        'spaced-comment': ['error', 'always'],
        'eol-last': 'off',
        'space-before-function-paren': ['error', 'never'],
        'quotes': ['error', 'single'],
        'camelcase': 'off',
        'space-before-function-paren': 'off',
        'max-len': ['error', { "code": 150 }],
    },
    'overrides': [{
        'files': ['*.vue'],
        'rules': {
            'indent': 'off',
            'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
            'quotes': ['error', 'single'],
            "vue/script-indent": 'off',
            "vue/no-unused-vars": 'off'
        }
    }],
    parserOptions: {
        parser: 'babel-eslint'
    }
};