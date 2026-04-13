import { useQuery } from "@tanstack/react-query";
import { getSigungu } from "front/api";
import { SigunguRequestType } from "@animal-project/shared-types";
import { Sigungu } from "@animal-project/shared-types";

type UseSigunguProps = {
  init: Sigungu,
} & SigunguRequestType

export const useSigungu = ({ ...props }: UseSigunguProps) => {
  const { upr_cd, init } = props
    const query = useQuery({
      queryKey: ['sigungu', upr_cd],
      initialData: [init],
      queryFn: async () => {
        const data = await getSigungu({ ...props });
        return [
          init,
          ...data.response.body.items.item,
        ]
      },
      enabled: !!upr_cd,
    });
    return query;
  };