export interface APIResponse<T> {
    response: {
      header: {
        reqNo: string;
        resultCode: string;
        resultMsg: string;
      };
      body: {
        items: {
          item: T[];
        };
        numOfRows: number;
        pageNo: number;
        totalCount: number;
      };
    };
  }
  
  interface Sido {
    orgCd: string;
    orgdownNm: string;
  }

  export type SidoResponse = APIResponse<Sido>;
  
  interface Sigungu {
    uprCd: string;
    orgCd: string;
    orgdownNm: string;
  }

  export type SigunguResponse = APIResponse<Sigungu>;

  interface Shelter {
    careRegNo: string;
    careNm: string;
  }

  export type ShelterResponse = APIResponse<Shelter>;

  interface Kind {
    kindCd: string;
    KNm: string;
  }

  export type KindResponse = APIResponse<Kind>;

  interface AnimalInfo {
    desertionNo: string; // 유기번호
    filename: string; // Thumbnail Image URL
    happenDt: string; // 접수일 (YYYYMMDD)
    happenPlace: string; // 발견장소
    kindCd: string; // 품종
    colorCd: string; // 색상
    age: string; // 나이
    weight: string; // 체중 (Kg 단위)
    noticeNo: string; // 공고번호
    noticeSdt: string; // 공고시작일 (YYYYMMDD)
    noticeEdt: string; // 공고종료일 (YYYYMMDD)
    popfile: string; // Image URL
    processState: string; // 상태 (예: 보호중)
    sexCd: string; // 성별 (M: 수컷, F: 암컷, Q: 미상)
    neuterYn: string; // 중성화 여부 (Y: 예, N: 아니오, U: 미상)
    specialMark: string; // 특징
    careNm: string; // 보호소 이름
    careTel: string; // 보호소 전화번호
    careAddr: string; // 보호소 주소
    orgNm: string; // 관할기관
    chargeNm: string; // 담당자
    officetel: string; // 담당자 연락처
    noticeComment?: string; // 특이사항 (optional)
  }
  
  export type AnimalInfoResponse = APIResponse<AnimalInfo>;