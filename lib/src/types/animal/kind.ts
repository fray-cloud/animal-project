import { Request } from "../publicAPI"

export const UpKind = {
    all : '',
    dog : '417000',
    cat : '422400',
    etc : '429900'
} as const

export type KindRequest = {
    up_kind_cd : string
} & Request

export interface Kind {
    kindCd: string;
    knm: string;
}