export interface IResponse<T> {
    succeed: boolean;
    message: string;
    data: T;
}
