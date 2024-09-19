import { useQuery } from "@tanstack/react-query";
import { getKind } from "front/new-api";
import { KindRequestType } from "front/new-types/requestAPI";
import { Kind } from "front/new-types/responseAPI";

type UseKindProps = {
  init : Kind
} & KindRequestType

export const useKind = ({ ...props }: UseKindProps) => {
  const {up_kind_cd, init} = props
    const query = useQuery({
      queryKey: ['kind', up_kind_cd],
      initialData: [
        init,
      ],
      queryFn: async () => {
        const data = await getKind({ up_kind_cd });
        return [
          init,
          ...data.response.body.items.item,
        ]
      },
      enabled: !!up_kind_cd
    });
    return query;
  };