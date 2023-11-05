export interface AxiosError<T = any> extends Error {
    config: any; // Axios request configuration
    code?: string; // Error code (if available)
    request?: any; // The request that generated this response
    response?: AxiosResponse<T>; // The response (if received) that caused the error
    isAxiosError: boolean; // True if the error was created by Axios
    toJSON: () => object; // A method to get a JSON representation of the error
}
  
export interface AxiosResponse<T = any> {
    data: T; // The payload returned from the server
    status: number; // HTTP status code from the server response
    statusText: string; // HTTP status message from the server response
    headers: any; // Headers that the server responded with
    config: any; // The config that was provided to Axios for the request
    request?: any; // The request that generated this response
}