import { ShelterRequestType } from "@animal-project/shared-types";
import { getAPI } from "../service";
import { Shelter } from "@animal-project/shared-types";

export const getShelter = (props : ShelterRequestType) => getAPI<ShelterRequestType, Shelter>(props, '/shelter')
