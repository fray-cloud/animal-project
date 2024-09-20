import { AnimalInfoRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { AnimalInfo } from "front/new-types/responseAPI";

export const getAnimalInfo = (props : AnimalInfoRequestType) => getAPI<AnimalInfoRequestType, AnimalInfo>(props, '/abandonmentPublic')
