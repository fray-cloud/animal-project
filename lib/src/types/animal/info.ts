import { Pagenation, Request } from "../publicAPI";

export type AnimalInfoRequest = {
    bgnde? : string,
    endde? : string,
    upkind? : string,
    kind? : string,
    upr_cd? : string,
    org_cd? : string,
    care_reg_no? : string,
    state? : string,
    neuter_yn? : string,
} & Request & Pagenation

export interface AnimalInfo {
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