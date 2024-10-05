export interface Request {
    serviceKey? : string,
    _type? : string
}

export type Pagenation =  {
    numOfRows : number,
    pageNo : number,
}

export interface APIResponse<T> {
    response: {
      header: {
        reqNo: string;
        resultCode: string;
        resultMsg: string;
      };
      body: {
        items: {
          item: T[];
        };
        totalCount: number;
      } & Pagenation;
    };
}

