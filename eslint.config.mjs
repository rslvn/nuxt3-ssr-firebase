// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-multiple-template-root': 'off',

    // enable and verify sometimes
    '@stylistic/padded-blocks': 'off',

    // check those rule whether we need or not

    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/object-curly-spacing': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/comma-dangle': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/key-spacing': 'off',
    'vue/block-tag-newline': 'off',
    '@stylistic/arrow-parens': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-comment-content-spacing': 'off',

    // real off rules
    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/object-curly-spacing': 'off',
    '@stylistic/eol-last': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/brace-style': 'off',
  }
})
