import { AnimalInfoRequestType } from "@animal-project/shared-types";
import { getAPI } from "../service";
import { AnimalInfo } from "@animal-project/shared-types";

export const getAnimalInfo = (props : AnimalInfoRequestType) => getAPI<AnimalInfoRequestType, AnimalInfo>(props, '/abandonmentPublic')
