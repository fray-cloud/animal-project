import axios from 'axios';

const localEndPoint = `http://localhost:8000`;
// const localEndPoint = `https://fast-api-production-d255.up.railway.app`

/**
 ** 공공데이터 포털 에러코드   
 * 1 : APPLICATION_ERROR   
 * 4 : HTTP_ERROR   
 * 12 : NO_OPENAPI_SERVICE_ERROR   
 * 20 : SERVICE_ACCESS_DENIED_ERROR   
 * 22 : LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR   
 * 30 : SERVICE_KEY_IS_NOT_REGISTERED_ERROR   
 * 31 : DEADLINE_HAS_EXPIRED_ERROR   
 * 32 : UNREGISTERED_IP_ERROR   
 * 99 : UNKNOWN_ERROR   

 ** 제공기관 에러코드   
 * 01 : APPLICATION ERROR.   
 * 02 : DB_ERROR.   
 * 10 : INVALID REQUEST PARAMETER ERROR.   
 * 11 : NO MANDATORY REQUEST PARAMETERS ERROR.   
 * 12 : NO OPENAPI SERVICE ERROR.   
 * 13 : METHOD NOT ALLOWED ERROR.   
 * 30 : SERVICE KEY IS NOT REGISTERED ERROR.   
 * 32 : UNREGISTERED IP ERROR.    
*/

export type defaultResponse<T> = {
  response: {
    body: {
      items: {
        item: T;
      };
      numOfRows?: number; //한 페이지 결과 수
      pageNo?: number; // 페이지 번호
      totalCount?: number; // 전체 결과 수
    };
    header: {
      reqNo: number; // 요청번호
      resultCode: string; //결과코드
      resultMsg: string; // 결과 메세지
      errorMsg?: string;
    };
  };
};

export type Sido = {
  orgCd: string; // 시도 코드
  orgdownNm: string; //시도명
  totalCount?: number;
};

export type Sigungu = {
  uprCd: string; // 상위 시도 코드
  orgCd: string; // 시군구 코드
  orgdownNm: string; //시군구명
};

export type Kind = {
  kindCd: string; // 품종코드
  knm: string; // 품종명
};

export type AbandonmentPublic = {
  desertionNo: string; // 유기번호
  filename: string; // 썸네일 이미지(링크)
  happenDt: string; // 접수일 YYYYMMDD
  happenPlace: string; // 발견장소
  kindCd: string; // 품종
  colorCd: string; // 색상
  age: string; // 나이
  weight: string; // 체중
  noticeNo: string; // 공고번호
  noticeSdt: string; // 공고 시작일 YYYYMMDD
  noticeEdt: string; // 공고 종료일 YYYYMMDD
  popfile: string; // 이미지(링크)
  processState: string; // 상태
  sexCd: 'M' | 'F' | 'Q'; // 성별 M : 남, F : 여, Q : 미상
  neuterYn: 'Y' | 'N' | 'U'; // 중성화 여부 Y : 예, N : 아니오, U : 미상
  specialMark: string; // 특징
  careNm: string; // 보호소 이름
  careTel: string; // 보호소 전화번호
  careAddr: string; // 보호장소
  orgNm: string; // 관할기관
  chargeNm: string; // 담당자
  officetel: string; // 담당자 연락처
  noticeComment: string; // 특이사항
};

export const apiGET = async <T, U extends {}>(
  service: string,
  args: U
): Promise<defaultResponse<T[]>> => {
  const result = await axios.get<defaultResponse<T[]>>(
    `${localEndPoint}/${service}`,
    { params: args }
  );
  return result.data;
};
