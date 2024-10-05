import { Request } from "../publicAPI";

export type ShelterRequest = {
    upr_cd : string,
    org_cd : string,
} & Request

export interface Shelter {
    careRegNo: string;
    careNm: string;
  }