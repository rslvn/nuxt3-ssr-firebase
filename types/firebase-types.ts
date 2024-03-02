import {Timestamp} from 'firebase/firestore'

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
    PROFILE = 'profile'
}

export interface BaseModel {
    id?: string,
    createdAt?: Timestamp | Date,
    createdBy?: string,
    updatedAt?: Timestamp | Date,
    updatedBy?: string
}

export interface Profile extends BaseModel {
    name?: string
    surname?: string
    username: string
}