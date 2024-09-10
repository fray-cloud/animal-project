import { KindRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { KindResponse } from "front/new-types/responseAPI";

export const getKind = (props : KindRequestType) => getAPI<KindRequestType, KindResponse>(props, '/kind')
