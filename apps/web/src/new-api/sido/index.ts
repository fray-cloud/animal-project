import { SidoRequestType } from "@animal-project/shared-types";
import { getAPI } from "../service";
import { Sido } from "@animal-project/shared-types";

export const getSido = (props : SidoRequestType) => getAPI<SidoRequestType, Sido>(props, '/sido')

