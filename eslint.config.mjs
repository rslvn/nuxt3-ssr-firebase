import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-multiple-template-root': 'off',

    // enable and verify sometimes
    '@stylistic/padded-blocks': 'off',
    'vue/max-attributes-per-line': 'off', // each attribute goes new line

    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/object-curly-spacing': 'off',
    '@stylistic/eol-last': 'off',
    '@stylistic/comma-dangle': 'off',
    'vue/comma-dangle': 'off',
    '@stylistic/brace-style': 'off',
    'vue/html-closing-bracket-newline': 'off',
  }
})
