import slugify from 'slugify'

export const SLUG_DELIMITER = '-'

export const sanitizeUrlContext = (urlContext: string) => slugify(urlContext, {
  lower: true,
  replacement: SLUG_DELIMITER,
  remove: /[*+~.,?#=()'"!:@_]/g,
  locale: 'en'
})
