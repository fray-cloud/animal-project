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
  
  export interface Sido {
    orgCd: string;
    orgdownNm: string;
  }
  
  export interface Sigungu {
    uprCd: string;
    orgCd: string;
    orgdownNm: string;
  }

  export type SigunguResponse = APIResponse<Sigungu>;

  export interface Shelter {
    careRegNo: string;
    careNm: string;
  }

  export type ShelterResponse = APIResponse<Shelter>;

  export interface Kind {
    kindCd: string;
    kindNm: string;
  }

  export type KindResponse = APIResponse<Kind>;

  export interface AnimalInfo {
    desertionNo: string;   // 유기번호
    happenDt: string;      // 접수일 (YYYYMMDD)
    happenPlace: string;   // 발견장소
    kindCd: string;         // 품종 코드
    kindNm?: string;        // 품종명 (예: 믹스견) — v2 신규
    kindFullNm?: string;    // 품종 전체명 (예: [개] 믹스견) — v2 신규
    upKindCd?: string;      // 축종 코드 — v2 신규
    upKindNm?: string;      // 축종명 (개/고양이/기타) — v2 신규
    colorCd: string;       // 색상
    age: string;           // 나이
    weight: string;        // 체중 (Kg)
    noticeNo: string;      // 공고번호
    noticeSdt: string;     // 공고시작일 (YYYYMMDD)
    noticeEdt: string;     // 공고종료일 (YYYYMMDD)
    popfile1: string;      // 이미지 URL (v2: popfile1~8)
    popfile2?: string;
    popfile3?: string;
    popfile4?: string;
    popfile5?: string;
    popfile6?: string;
    popfile7?: string;
    popfile8?: string;
    processState: string;  // 상태 (보호중 등)
    sexCd: string;         // 성별 (M: 수컷, F: 암컷, Q: 미상)
    neuterYn: string;      // 중성화 (Y/N/U)
    specialMark: string;   // 특징
    careRegNo?: string;    // 보호소 등록번호
    careNm: string;        // 보호소 이름
    careTel: string;       // 보호소 전화번호
    careAddr: string;      // 보호소 주소
    careOwnerNm?: string;  // 보호소 소유자 — v2 신규
    orgNm: string;         // 관할기관
    updTm?: string;        // 최종수정일시 — v2 신규
    noticeComment?: string; // 특이사항
  }
  
  export type AnimalInfoResponse = APIResponse<AnimalInfo>;