import { ShelterRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { Shelter } from "front/new-types/responseAPI";

export const getShelter = (props : ShelterRequestType) => getAPI<ShelterRequestType, Shelter>(props, '/shelter')
