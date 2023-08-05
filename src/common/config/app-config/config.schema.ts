import * as Convict from 'convict'
import { Config } from './config'
import { NodeEnv, SortDirection } from '../../common.enums'

export const Schema: Convict.Schema<Config.AppConfig> = {
  env: {
    doc: 'The application environment.',
    format: Object.values(NodeEnv),
    default: 'localhost',
    env: 'NODE_ENV'
  },
  server: {
    port: {
      doc: 'The server port',
      format: 'port',
      default: 8060,
      env: 'PORT'
    },
    isCluster: {
      doc: 'The flag that enabled server run in a cluster mode',
      format: Boolean,
      default: false,
      env: 'SERVER_IS_CLUSTER'
    },
    workers: {
      doc: 'The number of works in the cluster mode',
      format: Number,
      default: 2,
      env: 'SERVER_WORKERS'
    },
    workersMemory: {
      doc: 'The memory of each process in the cluster mode',
      format: Number,
      default: 128,
      env: 'SERVER_WORKERS_MEMORY'
    },
    workersMemoryAvailable: {
      doc: 'The total memory available',
      format: Number,
      default: 512,
      env: 'SERVER_WORKERS_MEMORY_AVAILABLE'
    }
  },
  pagination: {
    defaultPageSize: {
      format: Number,
      env: 'PAGINATION_DEFAULT_PAGE_SIZE',
      default: 25,
      nullable: false
    },
    defaultSortProperty: {
      format: String,
      env: 'PAGINATION_DEFAULT_SORT_PROPERTY',
      default: 'createdAt',
      nullable: false
    },
    defaultSortDirection: {
      format: Object.values(SortDirection),
      env: 'PAGINATION_DEFAULT_SORT_DIRECTION',
      default: SortDirection.DESC,
      nullable: false
    }
  }
}
