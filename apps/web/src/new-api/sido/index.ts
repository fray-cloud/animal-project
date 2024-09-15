import { SidoRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { Sido } from "front/new-types/responseAPI";

export const getSido = (props : SidoRequestType) => getAPI<SidoRequestType, Sido>(props, '/sido')

