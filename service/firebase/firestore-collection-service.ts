import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore'

import { Auth } from '@firebase/auth'
import {
  getIdsInWhereClause,
  sliceIntoChunks
} from './firebase-type-util'
import {
  BaseModel,
  OrderBy,
  WhereClause
} from '~/types'

const getQueryConstraintByWhereClauses = (...whereClauses: WhereClause[]) => {
  return whereClauses.map(clause => where(clause.field, clause.operator, clause.value))
}

const getQueryConstraintByOrderBy = (...orders: OrderBy[]) => {
  return orders.map(order => orderBy(order.field, order.direction))
}

const updateBaseModel = <T extends BaseModel>(firebaseAuth: Auth, model: T) => {
  const now = Timestamp.fromDate(new Date())
  if (!model.createdAt) {
    model.createdAt = now
  } else {
    // never overwrite createdAt
    delete model.createdAt
  }
  model.updatedAt = now

  const user = firebaseAuth.currentUser
  if (!model.createdBy) {
    model.createdBy = user?.uid || 'system'
  }
  model.updatedBy = user?.uid || 'system'
}

const getDocByRef = <T extends BaseModel>(docRef: DocumentReference) => {
  return getDoc(docRef)
    .then((value) => {
      return value.data() as T
    })
}

const setModelByRef = <T extends BaseModel>(firebaseAuth: Auth, docRef: DocumentReference, model: T): Promise<T> => {
  const modelCopy = { ...model }
  updateBaseModel(firebaseAuth, modelCopy)
  return setDoc(docRef, modelCopy, { merge: true })
    .then(() => {
      // return getDocByRef(docRef)
      return model
    })
}

const createEmptyDocument = (firestore: Firestore, collectionName: string) => {
  return doc(collection(firestore, collectionName))
}

const setModel = <T extends BaseModel>(firestore: Firestore, firebaseAuth: Auth, collectionName: string, model: T) => {
  const docRef = doc(firestore, collectionName, model.id)
  return setModelByRef(firebaseAuth, docRef, model)
}

const addModel = <T extends BaseModel>(firestore: Firestore, firebaseAuth: Auth, collectionName: string, model: T) => {
  const docRef = createEmptyDocument(firestore, collectionName)
  model.id = docRef.id
  return setModelByRef(firebaseAuth, docRef, model)
}

export const getDocumentId = (firestore: Firestore, collectionName: string) => {
  return createEmptyDocument(firestore, collectionName).id
}

export const saveModel = <T extends BaseModel>(firestore: Firestore, firebaseAuth: Auth, collectionName: string, model: T) => {
  return model.id
    ? setModel(firestore, firebaseAuth, collectionName, model)
    : addModel(firestore, firebaseAuth, collectionName, model)
}

export const deleteModel = <T extends BaseModel>(firestore: Firestore, collectionName: string, model: T) => {
  if (!model?.id) {
    return Promise.resolve()
  }
  return deleteDoc(doc(firestore, collectionName, model.id))
}

export const deleteFieldsOfModel = <T extends BaseModel>(firestore: Firestore, collectionName: string, model: T, ...fields: string[]) => {
  if (!fields || fields.length === 0) {
    return
  }
  const docRef = doc(firestore, collectionName, model.id)
  const data: any = {}
  fields.forEach((field) => {
    data[field] = deleteField()
  })
  return updateDoc(docRef, data)
}

export const getModelById = <T extends BaseModel>(firestore: Firestore, collectionName: string, id: string): Promise<T> => {
  const docRef = doc(firestore, collectionName, id)
  return getDocByRef(docRef)
}

export const getModelsByWhereClauses = <T extends BaseModel>(firestore: Firestore, collectionName: string, whereClause: WhereClause, ...whereClauses: WhereClause[]): Promise<T[]> => {
  const queryConstraints = [...getQueryConstraintByWhereClauses(whereClause), ...getQueryConstraintByWhereClauses(...whereClauses)]
  const collectionReference = collection(firestore, collectionName)
  const _query = query(collectionReference, ...queryConstraints)
  return getDocs(_query)
    .then((value) => {
      return value.docs.map(value1 => value1.data() as T)
    })
}

export const getModelsByOrderByAndWhereClauses = <T extends BaseModel>(firestore: Firestore, collectionName: string, order: OrderBy, ...whereClauses: WhereClause[]): Promise<T[]> => {
  const queryConstraints = [...getQueryConstraintByWhereClauses(...whereClauses), ...getQueryConstraintByOrderBy(order)]
  const collectionReference = collection(firestore, collectionName)
  const _query = query(collectionReference, ...queryConstraints)
  return getDocs(_query)
    .then((value) => {
      return value.docs.map(value1 => value1.data() as T)
    })
}

export const getModelsByIds = <T extends BaseModel>(firestore: Firestore, collectionName: string, ...modelIds: string[]): Promise<T[]> => {
  if (modelIds.length === 0) {
    return Promise.resolve([])
  }

  const chunkedModelIds = sliceIntoChunks(modelIds, 10)

  return Promise.all(chunkedModelIds.map(chunkedIds => getModelsByWhereClauses(firestore, collectionName, getIdsInWhereClause(chunkedIds))))
    .then((models) => {
      return models.length === 0
        ? ([] as T[])
        : models.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]) as T[]
    })
}
