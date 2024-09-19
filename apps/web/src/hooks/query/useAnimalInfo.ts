import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAnimalInfo } from "front/new-api";
import { AnimalInfoRequestType } from "front/new-types/requestAPI";


export const useAnimalInfo = (request: AnimalInfoRequestType | null | undefined) => {
    const query = useQuery({
      queryKey: ['animalInfo', request],
      queryFn: async () => {
        console.log('useAnimalInfo', request)
        return request? await getAnimalInfo({ ...request }): undefined;
      },
    });
    return query;
  };

export const useAnimalInfoInfinity = (request: AnimalInfoRequestType | null | undefined) => {
  const query = useInfiniteQuery({
    queryKey: ['animalInfo', request],
    queryFn: async ({pageParam}) => {
      return request? await getAnimalInfo({ ...request, pageNo: pageParam }): undefined;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.response.body.totalCount! / lastPage?.response.body.numOfRows! > lastPage?.response.body.pageNo! ? lastPage?.response.body.pageNo! + 1 : undefined
    }
  })

  return query;
}