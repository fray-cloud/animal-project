import { SidoRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { SidoResponse } from "front/new-types/responseAPI";

export const getSido = (props : SidoRequestType) => getAPI<SidoRequestType, SidoResponse>(props, '/sido')
