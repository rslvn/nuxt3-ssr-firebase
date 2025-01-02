import slugify from 'slugify'

export const SLUG_DELIMITER = '-'

const HTTP_PROTOCOL_REGEX = /(^\w+:|^)\/\//

export const sanitizeUrlContext = (urlContext: string) => slugify(urlContext, {
  lower: true,
  replacement: SLUG_DELIMITER,
  remove: /[*+~.,?#=()'"!:@]/g
})

export const removeHttpProtocol = (url: string) => url.replace(HTTP_PROTOCOL_REGEX, '')
