import React, { useContext } from 'react';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Link from '@mui/joy/Link';

import { RemoteContext } from '../app/app';

const Footer = () => {
  const context = useContext(RemoteContext);

  // const colors = ['primary', 'danger', 'success', 'warning'] as const;
  return (
    <Tabs
      size="lg"
      aria-label="Bottom Navigation"
      value={context!.selectIndex}
      onChange={(event, value) => context!.selectRemote(value as number)}
      sx={(theme) => ({
        p: 1,
        borderRadius: 16,
        maxWidth: 500,
        height: '40px',
        mx: 'auto',
        boxShadow: theme.shadow.sm,
        '--joy-shadowChannel':
          theme.vars.palette[context!.context[context!.selectIndex].color]
            .darkChannel,
        [`& .${tabClasses.root}`]: {
          py: 1,
          flex: 1,
          transition: '0.3s',
          fontWeight: 'md',
          fontSize: '9px',
          [`&:not(.${tabClasses.selected}):not(:hover)`]: {
            opacity: 0.7,
          },
        },
      })}
    >
      <TabList
        variant="plain"
        size="md"
        disableUnderline
        sx={{ borderRadius: 'lg', p: 0, height: '40px' }}
      >
        {context!.context.map((ctx, idx) => {
          return (
            <Link key={idx} href={'/' + ctx.route}>
              <Tab
                disableIndicator
                orientation="vertical"
                {...(context!.selectIndex && { color: ctx.color })}
              >
                <ListItemDecorator>{ctx.icon}</ListItemDecorator>
                {ctx.name}
              </Tab>
            </Link>
          );
        })}
      </TabList>
    </Tabs>
  );
};

export default Footer;
