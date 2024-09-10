import { ShelterRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { ShelterResponse } from "front/new-types/responseAPI";

export const getShelter = (props : ShelterRequestType) => getAPI<ShelterRequestType, ShelterResponse>(props, '/shelter')
