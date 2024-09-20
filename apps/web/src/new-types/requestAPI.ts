interface RequestType {
    serviceKey? : string,
    _type? : string
}

interface PagenationType {
    numOfRows : number,
    pageNo : number,
}

export type SidoRequestType = {} & RequestType & PagenationType

export type SigunguRequestType = {
    upr_cd? : string
} & RequestType

export type ShelterRequestType = {
    upr_cd : string,
    org_cd : string,
} & RequestType

export type KindRequestType = {
    up_kind_cd : string // '' | '417000' | '422400' | '429900', // 개, 고양이, 기타 순
} & RequestType

export type AnimalInfoRequestType = {
    bgnde? : string,
    endde? : string,
    upkind? : string,
    kind? : string,
    upr_cd? : string,
    org_cd? : string,
    care_reg_no? : string,
    state? : string,
    neuter_yn? : string,
} & RequestType & PagenationType