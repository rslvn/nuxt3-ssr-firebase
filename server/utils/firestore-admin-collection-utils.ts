import { BaseModel, CollectionField, FirebaseQueryOperator, OrderBy, WhereClause } from '~/types'
import {getFirestore,QuerySnapshot} from "firebase-admin/firestore";

const SYSTEM = 'system'

const toBaseModelArray = <T extends BaseModel>(querySnapshot: QuerySnapshot): T[] => {
  const docs: T[] = []
  querySnapshot.forEach(function(doc) {
    docs.push(doc.data() as T)
  })

  return docs
}

const getQueryByWhereClauses = (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]) => {
  const collectionReference = getFirestore().collection(collection)

  let query = collectionReference.where(whereClause.field, whereClause.operator, whereClause.value)
  whereClauses.forEach((wc) => {
    query = query.where(wc.field, wc.operator, wc.value)
  })

  return query
}

const updateBaseModel = <T extends BaseModel>(model: T) => {
  const date = new Date()
  if (!model.createdAt) {
    model.createdAt = date
  } else {
    // never overwrite createdAt
    delete model.createdAt
  }

  if (!model.createdBy) {
    model.createdBy = SYSTEM
  }

  model.updatedAt = date
  model.updatedBy = SYSTEM

}

const setModel = <T extends BaseModel>(collectionName: string, model: T) => {
  updateBaseModel(model)

  const docRef = getFirestore().collection(collectionName).doc(model.id as string)

  return docRef.set(model, {
      merge: true,
    })
    .then(() => {
      return model
    })
}

export const createDocument = (collectionName: string) => {
  return getFirestore().collection(collectionName).doc().id
}

const addModel = <T extends BaseModel>(collectionName: string, model: T) => {
  model.id = createDocument(collectionName)

  return setModel(collectionName, model)
}

export const saveModel = <T extends BaseModel>(collectionName: string, model: T) => {
  return model.id
    ? setModel(collectionName, model)
    : addModel(collectionName, model)
}

export async function getModelsByWhereClauses<T extends BaseModel>(
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]
): Promise<T[]> {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return await query
    .get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export async function getModelsByOrderByAndWhereClauses<T extends BaseModel>(
  collection: string,
  orderBy: OrderBy,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]
): Promise<T[]> {
  let query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  return await query
    .get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export async function getModelById<T extends BaseModel>(collection: string, modelId: string) {
  return await getFirestore()
    .collection(collection)
    .doc(modelId)
    .get()
    .then((document) => {
      return document.data() as T
    })
}

export async function getModelByIds<T extends BaseModel[]>(collection: string, ...modelIds: string[]) {
  const idsInWhereClause: WhereClause = {
    field: CollectionField.COMMON.id,
    operator: FirebaseQueryOperator.IN,
    value: modelIds,
  }
  return await getModelsByWhereClauses(collection, idsInWhereClause)
}

export async function getAllModels<T extends BaseModel[]>(collectionName: string) {
  return await getFirestore()
    .collection(collectionName)
    .get()
    .then(toBaseModelArray)
}

export const deleteModel = <T extends BaseModel>(collection: string, model: T) => {
  return getFirestore()
    .collection(collection)
    .doc(model.id as string)
    .delete()
}

