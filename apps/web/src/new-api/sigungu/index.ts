import { SigunguRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { Sigungu } from "front/new-types/responseAPI";

export const getSigungu = (props : SigunguRequestType) => getAPI<SigunguRequestType, Sigungu>(props, '/sigungu')
