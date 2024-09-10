import { SigunguRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { SigunguResponse } from "front/new-types/responseAPI";

export const getSigungu = (props : SigunguRequestType) => getAPI<SigunguRequestType, SigunguResponse>(props, '/sigungu')
