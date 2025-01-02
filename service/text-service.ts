const DASHES_REGEX = /-/g

export const removeDashes = (text: string) => {
  return text.replace(DASHES_REGEX, '')
}
