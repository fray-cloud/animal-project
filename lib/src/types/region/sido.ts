import { Pagenation, Request } from "../publicAPI";

export type SidoRequest = Request & Pagenation

export interface Sido {
    orgCd: string;
    orgdownNm: string;
}