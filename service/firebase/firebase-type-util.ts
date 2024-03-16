import {CollectionField, FirebaseQueryOperator, WhereClause} from '~/types'

export interface KeyValuePair {
    key: string,
    value: string
}

export const getWhereClause = (field: string, operator: FirebaseQueryOperator, value: any): WhereClause => {
    return {
        field,
        operator,
        value,
    }
}

export const sliceIntoChunks = (arr: any[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export const getEqualsWhereClause = (field: string, value: any): WhereClause => {
    return getWhereClause(field, FirebaseQueryOperator.EQ, value)
}

export const getInWhereClause = (field: string, values: any[]): WhereClause => {
    return getWhereClause(field, FirebaseQueryOperator.IN, values)
}

export const getIdsInWhereClause = (values: any[]): WhereClause => {
    return getWhereClause(CollectionField.COMMON.id, FirebaseQueryOperator.IN, values)
}