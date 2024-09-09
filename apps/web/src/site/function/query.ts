import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  Sido,
  Sigungu,
  Kind,
  apiGET,
  AbandonmentPublic,
  defaultResponse,
} from '../../api/callAPI';
import dayjs, { Dayjs } from 'dayjs';
import { AbandonmentPublicForm } from './form';
import { useFormContext } from 'react-hook-form';

const initialDataForm = <T>(init: T): defaultResponse<T[]> => {
  return {
    response: {
      body: {
        items: {
          item: [init],
        },
      },
      header: {
        reqNo: -1,
        resultCode: '-1', //결과코드
        resultMsg: '-1', // 결과 메세지
      },
    },
  };
};

export const useQuerySido = () => {
  const qf = () => {
    const data = apiGET<Sido, { numOfRows?: number }>('sido', {
      numOfRows: 30,
    });
    return data;
  };

  const { data, ...queryInfo } = useQuery({
    queryKey: ['upr_cd'],
    queryFn: qf,
  });

  return {
    data,
    queryInfo,
  };
};

export const useQuerySigungu = (upr_cd: string | undefined) => {
  const queryClient = useQueryClient();
  // 쿼리키가 undefined인 경우 오류를 발생합니다.
  // react-form 의 경우 초기 값을 정하지 않는 경우 undefined를 발생시킵니다.
  const queryKey = ['org_cd', upr_cd ?? 'undefined'];

  const qf = ({ queryKey, ...param }: QueryFunctionContext) => {
    const updateCount = queryClient.getQueryState(queryKey)?.dataUpdateCount;

    // 초기 API 로 받은 후 캐싱된 값을 가져옵니다.
    // 이는 상위 값을 변경 시 이미 전송된 값이 있는 경우 재활용하기 위함입니다.
    // updateCount가 undefined인 경우는 using 되지 않은 경우, 0 인경우는 처음 using 되었을 때 입니다.
    if (updateCount && updateCount > 0) {
      const data =
        queryClient.getQueryData<defaultResponse<Sigungu[]>>(queryKey);
      if (data?.response.header.resultCode === '00') {
        return queryClient.getQueryData<defaultResponse<Sigungu[]>>(queryKey);
      }
    }
    // API response
    if (upr_cd) {
      const data = apiGET<Sigungu, { upr_cd?: string }>('sigungu', {
        upr_cd: upr_cd,
      });
      return data;
    }
    return undefined;
  };

  const { data, ...queryInfo } = useQuery({
    queryKey: queryKey,
    queryFn: qf,
    // initialData : initialDataForm<Sigungu>({
    //     uprCd : '-1',
    //     orgCd : '-1',
    //     orgdownNm : '전체'
    // }),
    enabled: !!upr_cd,
  });

  return {
    data,
    queryInfo,
  };
};

type UpKind = {
  up_kind_cd: string;
  upknm: string;
  emoji: string;
};

export const useQueryUpKind = () => {
  const defaultValues = [
    { up_kind_cd: '-1', upknm: '전체', emoji: '전체' },
    { up_kind_cd: '417000', upknm: '개', emoji: '🐕' },
    { up_kind_cd: '422400', upknm: '고양이', emoji: '🐈' },
    { up_kind_cd: '429900', upknm: '기타', emoji: '🤨' },
  ];
  const { data, ...queryInfo } = useQuery<UpKind[]>({
    queryKey: ['kind'],
    queryFn: () => {
      return defaultValues;
    },
    initialData: defaultValues,
  });

  return {
    data,
    queryInfo,
  };
};

export const useQueryKind = (kind: string | undefined) => {
  const queryClient = useQueryClient();
  // 쿼리키가 undefined인 경우 오류를 발생합니다.
  // react-form 의 경우 초기 값을 정하지 않는 경우 undefined를 발생시킵니다.
  const queryKey = ['kind', kind ?? 'undefined'];
  const qf = ({ queryKey, ...param }: QueryFunctionContext) => {
    const updateCount = queryClient.getQueryState(queryKey)?.dataUpdateCount;
    // 초기 API 로 받은 후 캐싱된 값을 가져옵니다.
    // 이는 상위 값을 변경 시 이미 전송된 값이 있는 경우 재활용하기 위함입니다.
    // updateCount가 undefined인 경우는 using 되지 않은 경우, 0 인경우는 처음 using 되었을 때 입니다.
    if (updateCount && updateCount > 0) {
      return queryClient.getQueryData<defaultResponse<Kind[]>>(queryKey);
    }
    if (kind) {
      const data = apiGET<Kind, { up_kind_cd?: string }>('kind', {
        up_kind_cd: kind,
      });
      return data;
    }
    return undefined;
  };

  const { data, ...queryInfo } = useQuery({
    queryKey: queryKey,
    queryFn: qf,
    // initialData : initialDataForm<Kind>({
    //     kindCd : '-1',
    //     knm : '종류를 선택하세요.'
    // }),
    enabled: !!kind,
  });

  return {
    data,
    queryInfo,
  };
};

export const useQueryStartDate = (bgnde: Dayjs | undefined) => {
  const queryKey = 'bgnde';
  const initialData = dayjs().add(-7, 'days');
  const queryClient = useQueryClient();
  const { data, ...queryInfo } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return bgnde;
    },
    initialData: initialData,
    enabled: !!bgnde,
  });
  const update = (updateData: Dayjs | null) => {
    queryClient.setQueryData([queryKey], updateData);
  };
  return {
    queryKey,
    initialData,
    data,
    queryInfo,
    update,
  };
};

export const useQueryEndDate = (endde: Dayjs | undefined) => {
  const queryKey = 'endde';
  const initialData = dayjs();
  const queryClient = useQueryClient();
  const { data, ...queryInfo } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return endde;
    },
    initialData: initialData,
    enabled: !!endde,
  });
  const update = (updateData: Dayjs | null) => {
    queryClient.setQueryData([queryKey], updateData);
  };
  return {
    queryKey,
    initialData,
    data,
    queryInfo,
    update,
  };
};

type AbandonmentPublicProp = {
  bgnde?: string; // 유기날짜 시작일
  endde?: string; // 유기날짜 종료일
  upkind?: string; // 축종코드
  kind?: string; // 품종코드
  upr_cd?: string; // 시도코드
  org_cd?: string; // 시군구코드
  care_reg_no?: string; // 보호소번호
  state?: string; // 상태
  neuter_yn?: string; // 중성화여부
  pageNo?: string; // 페이지 번호
  numOfRows?: string; // 페이지당 보여줄 갯수
};

export const useQueryAbandonment = (abandonment: AbandonmentPublicForm) => {
  const queryKey = 'abandonment';
  const queryClient = useQueryClient();
  const formContext = useFormContext();
  const { data, ...queryInfo } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => {
      console.log(queryKey, 'start');
      if (
        formContext.formState.isSubmitSuccessful ||
        formContext.formState.isSubmitted ||
        formContext.formState.isSubmitting
      ) {
        console.log(queryKey, 'if');
        return apiGET<AbandonmentPublic, AbandonmentPublicProp>(
          'abandonmentPublic',
          {
            ...abandonment,
            bgnde: abandonment.bgnde?.format('YYYYMMDD'),
            endde: abandonment.endde?.format('YYYYMMDD'),
            pageNo: pageParam.toString(),
            numOfRows: '10',
          }
        );
      }
      console.log(queryKey, 'else');
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPAgeParam) => {
      return lastPage?.response.body.totalCount! /
        lastPage?.response.body.numOfRows! >
        lastPage?.response.body.pageNo!
        ? lastPage?.response.body.pageNo! + 1
        : undefined;
    },
  });

  const update = (updateData: AbandonmentPublicForm) => {
    // queryClient.setQueryData([queryKey]);
    queryClient.fetchQuery({ queryKey: [queryKey] });
  };

  return {
    queryKey,
    data,
    queryInfo,
    update,
  };
};
