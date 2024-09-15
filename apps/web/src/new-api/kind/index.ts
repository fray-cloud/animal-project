import { KindRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { Kind } from "front/new-types/responseAPI";

export const getKind = (props : KindRequestType) => getAPI<KindRequestType, Kind>(props, '/kind')
