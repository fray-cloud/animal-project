import { useQuery } from "@tanstack/react-query";
import { getSigungu } from "front/new-api";
import { SigunguRequestType } from "front/new-types/requestAPI";
import { Sigungu } from "front/new-types/responseAPI";

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