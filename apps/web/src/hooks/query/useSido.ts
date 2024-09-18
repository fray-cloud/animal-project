import { useQuery } from '@tanstack/react-query';
import { getSido } from 'front/new-api';
import { Sido } from 'front/new-types/responseAPI';

type UseSidoProps = {
  init : Sido
}

export const useSido = ({...props}: UseSidoProps) => {
  const {init} = props
    const query = useQuery({
      queryKey: ['sido'],
      initialData: [
        init,
      ],
      queryFn: async () => {
        const data = await getSido({ numOfRows: 100, pageNo: 1 });
        return [
          init,
          ...data.response.body.items.item,
        ];
      },
    });
    return query;
  };