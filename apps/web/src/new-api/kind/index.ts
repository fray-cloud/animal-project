import { KindRequestType } from "@animal-project/shared-types";
import { getAPI } from "../service";
import { Kind } from "@animal-project/shared-types";

export const getKind = (props : KindRequestType) => getAPI<KindRequestType, Kind>(props, '/kind')
