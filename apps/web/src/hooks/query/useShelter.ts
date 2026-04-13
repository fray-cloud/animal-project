import { useQuery } from "@tanstack/react-query";
import { getShelter } from "front/api";
import { ShelterRequestType } from "@animal-project/shared-types";
import { Shelter } from "@animal-project/shared-types";

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