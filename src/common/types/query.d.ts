declare namespace Query {
  type CountResults = {
    _id: string
    count: number
  }
  type SumResults = {
    _id: string
    sum: number
  }
  type CountAndDoc<T> = {
    _id: string
    doc: T
  }
  type CountIdTypeResults<T> = {
    _id: T
    count: number
  }
  type DateIdTypeResults<T> = {
    _id: string
    date: T
  }

  type InQuery = {
    $in: string[] | Mongoose.ObjectId[]
  }
  type IdInQuery = {
    _id: InQuery
  }
  type NotInQuery = {
    $nin: (string | Mongoose.ObjectId)[]
  }
  type IdNotInQuery = {
    _id: NotInQuery
  }
  type IncQuery<T> = {
    $inc: Record<T, number>
  }
  type SetQuery<T> = {
    $set: Record<T, number>
  }
  type GteQuery<T> = {
    $gte: Record<T, number>
  }
  type LteQuery<T> = {
    $lte: Record<T, number>
  }

  type RecordGteQuery<T> = Record<keyof T, GteQuery<T>>
  type RecordLteQuery<T> = Record<keyof T, LteQuery<T>>

  type CustomQuery<T> = Record<keyof T> | RecordGteQuery<T> | RecordLteQuery<T> | IdNotInQuery

  type Sort = { [key: string]: import('mongoose').SortOrder }
}
