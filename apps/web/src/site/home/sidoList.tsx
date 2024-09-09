import React, { useEffect, useState } from 'react';
import { apiGET, Sido, AbandonmentPublic } from '../../api/callAPI';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';

const SidoList = () => {
  const [sidoList, setsidoList] = useState<Sido[]>([]);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    console.log('home sido list start');
    const data = apiGET<Sido, { numOfRows?: number }>('sido', {
      numOfRows: 30,
    });
    data.then((sido) => {
      setsidoList(
        sido.response.body.items.item.sort((a, b) => {
          return b.totalCount! - a.totalCount!;
        })
      );
      setOpenList(true);
    });
    return () => {};
  }, []);

  return (
    <>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            유기동물 현황 ({dayjs().format('YYYY-MM-DD')} 기준)
          </ListSubheader>
        }
      >
        {openList
          ? sidoList?.map((res, idx) => {
              return (
                <ListItem key={idx} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={process.env.PUBLIC_URL + `/logo/${res.orgCd}.png`}
                        sx={{ width: '30px', height: 'auto' }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={res.orgdownNm} />
                    <Badge badgeContent={res.totalCount} max={999} />
                  </ListItemButton>
                </ListItem>
                // <div>{res.orgdownNm} | {res.orgCd} : {res.count}</div>
              );
            })
          : sidoList.map((_, idx) => {
              return (
                <ListItem key={idx} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Skeleton
                        variant="rounded"
                        // src={process.env.PUBLIC_URL + `/logo/${res.orgCd}.png`}
                        sx={{ width: '60%' }}
                      />
                    </ListItemAvatar>
                    <Skeleton variant="text" sx={{ width: '80%' }} />
                    <Skeleton variant="text" sx={{ width: '10%' }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
      </List>
    </>
  );
};

export default SidoList;
