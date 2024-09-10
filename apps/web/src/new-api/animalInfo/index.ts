import { AnimalInfoRequestType } from "front/new-types/requestAPI";
import { getAPI } from "../service";
import { AnimalInfoResponse } from "front/new-types/responseAPI";

export const getAnimalInfo = (props : AnimalInfoRequestType) => getAPI<AnimalInfoRequestType, AnimalInfoResponse>(props, '/abandonmentPublic')
