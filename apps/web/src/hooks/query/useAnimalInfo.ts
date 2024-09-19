import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getAnimalInfo } from "front/new-api";
import { AnimalInfoRequestType } from "front/new-types/requestAPI";
import { Sido } from "front/new-types/responseAPI";

export const useAnimalInfoSidoCount = (sidos : Sido[]) => {
    const query = useQueries({
      queries: sidos?.map((sido) => ({
        queryKey: ['count', sido.orgdownNm],
        queryFn: async () => {
          const data = await getAnimalInfo({upr_cd : sido.orgCd, numOfRows: 1, pageNo: 1})
          return {
            sido : sido,
            totalCount : data.response.body.totalCount
          }
        }
      })),
      combine: (result) => result.sort((a, b) => (b.data?.totalCount ?? 0) - (a.data?.totalCount ?? 0))
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