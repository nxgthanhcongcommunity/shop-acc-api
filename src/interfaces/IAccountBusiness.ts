import { AccountModel } from "../models";
import { IQueryBaseRequest, IQueryBaseResponse } from "./IQueryBase";

export interface IGetAccountsRequest extends IQueryBaseRequest { }
export interface IGetAccountsResponse extends IQueryBaseResponse<AccountModel> { }

export interface IGetAccountBalanceByCodeRequest {
    code: string;
}