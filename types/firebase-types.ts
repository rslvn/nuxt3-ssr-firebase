import {Timestamp} from 'firebase/firestore'
import {UserInfo} from '@firebase/auth'

export interface Image {
  src: string
  alt?: string
  path?: string
}

// auth types
export interface ProviderConfig {
  providerId: string
  name: string
  color: string
  icon: string
}

export const PROVIDER_CONFIGS = {
  PASSWORD: {providerId: 'password', name: 'Password', color: 'fuchsia', icon: 'i-heroicons-envelope'} as ProviderConfig,
  GOOGLE: {providerId: 'google.com', name: 'Google', color: 'red', icon: 'i-simple-icons-google'} as ProviderConfig,
  FACEBOOK: {providerId: 'facebook.com', name: 'Facebook', color: 'blue', icon: 'i-simple-icons-facebook'} as ProviderConfig,
  TWITTER: {providerId: 'twitter.com', name: 'Twitter', color: 'sky', icon: 'i-simple-icons-twitter'} as ProviderConfig,
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
  building?: string
  street?: string
  customInformation?: string
  city?: string
  state?: string
  zip?: string
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
