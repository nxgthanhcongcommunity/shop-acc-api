export interface IResponse<T> {
    succeed: boolean;
    message: string;
    clientMessage?: string;
    data: T;
}
