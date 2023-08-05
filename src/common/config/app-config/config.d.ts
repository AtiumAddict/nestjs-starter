export namespace Config {
  export interface Server {
    port: number
    isCluster: boolean
    workers: number
    workersMemory: number
    workersMemoryAvailable: number
  }

  export type MongoDB = {
    uri: string
    connectionTimeout: number
    connections: number
  }

  export type Api = {
    baseUrl: string
    basePath: string
  }

  export type Proxy = {
    url: string
  }

  export type Proxies = {
    notifications: Proxy
    coupons: Proxy
    contests: Proxy
    games: Proxy
    rewardSchemes: Proxy
    apiKey: string
  }

  export type Pagination = {
    defaultPageSize: number
    defaultSortProperty: string
    defaultSortDirection: import('../../core/enums').SortDirection
  }

  export type SearchCustomer = {
    autocompleteMaxResults: number
    autocompleteIndexName: string
  }

  export type Search = {
    customer: SearchCustomer
  }

  export type AppConfig = {
    server: Server
    env: import('../../common.enums').NodeEnv
    mongodb: MongoDB
    api: Api
    proxies: Proxies
    pagination: Pagination
    search: Search
    MONGO_URI: string
  }
}
