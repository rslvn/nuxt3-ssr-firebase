import {Timestamp} from 'firebase/firestore'
import {UserInfo} from "@firebase/auth";

export interface Image {
    src: string
    alt?: string
    path?: string
}

// auth types
export enum ProviderIdType {
    PASSWORD = 'password',
    GOOGLE = 'google.com',
    TWITTER = 'twitter.com',
    FACEBOOK = 'facebook.com',
}

export interface FirebaseClaims {
    username: string
}

export interface AuthUser {
    displayName: string
    email?: string
    profilePhoto?: Image
    userId: string
    username: string
    emailVerified: boolean
    providers: UserInfo[]
}

// firestore types
export enum FirebaseQueryOperator {
    LT = '<',
    LE = '<=',
    EQ = '==',
    GE = '>=',
    GT = '>',
    IN = 'in',
    ARRAY_CONTAINS = 'array-contains',
    ARRAY_CONTAINS_ANY = 'array-contains-any',
}

export interface WhereClause {
    field: string
    operator: FirebaseQueryOperator
    value: any
}

export interface OrderBy {
    field: string
    direction: 'asc' | 'desc'
}

export const CollectionField = {
    COMMON: {
        id: 'id',
        status: 'status',
        slug: 'slug'
    }
}

export enum FirestoreCollection {
    USER_PROFILE = 'user-profile',
    ALBUM = 'album',
    ALBUM_IMAGE = 'album-image'
}

export interface BaseModel {
    id?: string
    createdAt?: Timestamp | Date
    createdBy?: string
    updatedAt?: Timestamp | Date
    updatedBy?: string
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export enum AlbumType {
    PROFILE = 'PROFILE',
    COVER = 'COVER',
    CUSTOM = 'CUSTOM',
}

export interface Address {
    street?: string
    city?: string
    state?: string
    zip?: string,
    country: string
}

export interface Album extends BaseModel {
    name: string
    albumType: AlbumType
}

export interface AlbumImage extends BaseModel {
    albumId: string
    image: Image
}

export interface UserProfile extends BaseModel {
    name?: {
        firstName?: string
        middleName?: string
        lastName?: string
    }
    username: string
    gender?: Gender
    email?: string
    address?: Address
    about?: string
    profilePhoto: AlbumImage
    coverPhoto: AlbumImage
}