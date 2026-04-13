import { SigunguRequestType } from "@animal-project/shared-types";
import { getAPI } from "../service";
import { Sigungu } from "@animal-project/shared-types";

export const getSigungu = (props : SigunguRequestType) => getAPI<SigunguRequestType, Sigungu>(props, '/sigungu')
