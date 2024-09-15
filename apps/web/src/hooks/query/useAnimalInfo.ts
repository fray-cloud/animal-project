import { useQuery } from "@tanstack/react-query";
import { getAnimalInfo } from "front/new-api";
import { AnimalInfoRequestType } from "front/new-types/requestAPI";

export const useAnimalInfo = ({ ...props }: AnimalInfoRequestType) => {
    const query = useQuery({
      queryKey: ['animalInfo'],
      queryFn: async () => {
        return await getAnimalInfo({ ...props });
      },
    });
    return query;
  };