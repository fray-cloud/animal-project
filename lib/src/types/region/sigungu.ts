import { Request } from "../publicAPI"

export type SigunguRequest = {
    upr_cd? : string
} & Request

export interface Sigungu {
    uprCd: string;
    orgCd: string;
    orgdownNm: string;
}