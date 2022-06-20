export interface PostList {
    page: number
    posts: Post[]
  }
  
  interface HTTPResponseError {
    message: string
  }
  export interface HTTPResponseBody extends APIResponseBody<PostList, HTTPResponseError> {}
  
  export type AscendOrderType = 'ASC'
  export type DescendOrderType = 'DESC'
  export type OrderTypes = AscendOrderType | DescendOrderType
  
  export interface DashboardProps {}