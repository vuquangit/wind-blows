interface IError {
  code: string | null
  message: string | null
}

export interface IMeta {
  // status?: number
  // message?: string
  links: any[]
  path: string
  perPage: number
  currentPage: number
  lastPage: number
  from: number | null // the page's first record order number
  to: number | null // the page's last record order number
  total: number // total number of records in the database
}

export interface ILinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface IBaseResponse<T = any> {
  status?: number
  success?: boolean
  data?: T
  meta?: IMeta
  links?: ILinks
  error?: IError
}

export interface IStateSearchLocation {
  page?: number
  sort?: string
  filter?: string
  organizationName?: string
}

export interface IStateFromLocation {
  from?: {
    path: string
    search: string
    hash: string
    state: IStateSearchLocation
    key: string
  }
  key: string
}

export interface IStateInitLocation {
  init?: IStateSearchLocation
}
