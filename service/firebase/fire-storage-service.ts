import {sanitizeUrlContext, SLUG_DELIMITER} from "~/service/url-service";
import {v4 as uuidv4} from 'uuid';

const basename = (fileName: string): string => {
    return fileName.split('.').slice(0, -1).join('.')
}

export const getNewFileName = (fileName: string): string => {
    if (fileName) {
        const baseNameSanitized = sanitizeUrlContext(basename(fileName))
        const extension = fileName.split('.').pop()
        return `${baseNameSanitized}${SLUG_DELIMITER}${uuidv4()}.${extension}`
    }
    return fileName
}

// export const getProfilePhotosPath = (userId: string) => {
//     return `users/${userId}/profilePhotos/`
// }
//
// export const getCoverPhotosPath = (userId: string) => {
//     return `users/${userId}/coverPhotos/`
// }