import React, { useContext } from 'react';
import { Breadcrumbs, Sheet, Link, Typography } from '@mui/joy';
import PublicIcon from '@mui/icons-material/Public';

import { RemoteContext } from '../app/app';

const Header = () => {
  const context = useContext(RemoteContext);

  return (
    <Sheet
      color={context!.context[context!.selectIndex].color}
      variant="soft"
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumbs">
        <Link color="neutral" href="/">
          <PublicIcon sx={{ mr: 0.5 }} />
          {context!.context[context!.selectIndex].name}
        </Link>
      </Breadcrumbs>
    </Sheet>
  );
};

export default Header;
