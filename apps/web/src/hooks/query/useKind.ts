import { useQuery } from "@tanstack/react-query";
import { getKind } from "front/new-api";
import { KindRequestType } from "@animal-project/shared-types";
import { Kind } from "@animal-project/shared-types";

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