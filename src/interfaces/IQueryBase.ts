
export interface IQueryBaseRequest {
    page: number;
    limit: number;
    name: string;
}

export interface IQueryBaseResponse<T> {
    total: number;
    data: T[];
}