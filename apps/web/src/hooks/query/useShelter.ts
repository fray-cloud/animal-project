import { useQuery } from "@tanstack/react-query";
import { getShelter } from "front/new-api";
import { ShelterRequestType } from "front/new-types/requestAPI";
import { Shelter } from "front/new-types/responseAPI";

type UseShelterProps = {
  init : Shelter
} & ShelterRequestType

export const useShelter = ({ ...props }: UseShelterProps) => {
  const { upr_cd, org_cd, init } = props  
  const query = useQuery({
      queryKey: ['shelter', org_cd, upr_cd],
      initialData: [
        init,
      ],
      queryFn: async () => {
        const data = await getShelter({ ...props });
        return [
          init,
          ...data.response.body.items.item,
        ]
      },
      enabled: !!upr_cd && !!org_cd
    });
    return query;
  };