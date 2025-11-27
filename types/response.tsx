export interface ApiResponse<T>  {
    status: BigInteger,
    message: string,
    data: T
}
