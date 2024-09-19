import axios from "axios";
import { APIResponse } from "front/new-types/responseAPI";

const baseURL = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc'
const serviceKey = 'GsGMbaDETPd05r326o0ICejVO+U/XwTQES1Tf8Vl3wL0fuYEMxV/3Ai2pLmcPFT9yWXTlE9DwTf7H1dR3ezWgg=='

export const serviceAPI = axios.create({
    baseURL : baseURL,
    timeout : 10000,
})

export const getAPI = async <T, K>(props : T, path : string) => {
    const data = await serviceAPI.get<APIResponse<K>>(path, {
        params : {
            ...props,
            serviceKey : serviceKey,
            _type: 'json'
        }
    })
    return data.data;
}