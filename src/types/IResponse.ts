interface IResponse<T> {
  succeed: boolean;
  message: string;
  data: T;
}

export default IResponse;
