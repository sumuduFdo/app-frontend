export interface Response {
    success: boolean,
    error: {status: number, message: string} | null,
    data?: any
}