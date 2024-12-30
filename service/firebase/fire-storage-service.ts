import { v4 as uuidv4 } from 'uuid'
import { sanitizeUrlContext, SLUG_DELIMITER } from '~/service/url-service'

export const DEFAULT_COMPRESSED_IMAGE_MIME = 'image/webp'

const getFileBaseName = (fileName: string): string => {
  return fileName?.split('.')?.slice(0, -1)?.join('.')
}

export const getNewFileName = (fileName: string, fileExtension?: string): string => {
  const fileBaseName = getFileBaseName(fileName) || ''
  const baseNameSanitized = `${sanitizeUrlContext(fileBaseName)}${SLUG_DELIMITER}${uuidv4().split('-')[0]}`
  const extension = fileExtension || fileName.split('.').pop()
  return extension ? `${baseNameSanitized}.${extension}` : baseNameSanitized
}
