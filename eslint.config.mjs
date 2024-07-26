// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/no-multiple-template-root': 'off',
    }
})
