import { Kind, Shelter, Sido, Sigungu } from "@animal-project/shared-types";


export const initSido: Sido = {
    orgCd: '',
    orgdownNm: '모두',
  };

export const initSigungu:Sigungu = {
    uprCd: '',
    orgCd: '',
    orgdownNm: '모두',
  };

export const initShelter:Shelter = {
    careNm: '모두',
    careRegNo: '',
  };

export const initKind: Kind = {
    kindNm: '모두',
    kindCd: '',
  };

export const Upkinds = [
    { upKindNm: '모두', upkind: '' },
    { upKindNm: '개', upkind: '417000' },
    { upKindNm: '고양이', upkind: '422400' },
    { upKindNm: '기타', upkind: '429900' },
  ];