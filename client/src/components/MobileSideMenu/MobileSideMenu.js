import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { ReactComponent as DashboardIcon } from '../../component-assets/dashboard_icon.svg';
import { ReactComponent as CustomerIcon } from '../../component-assets/customer_icon.svg';
import { ReactComponent as DriverIcon } from '../../component-assets/driver_icon.svg';
import { ReactComponent as TrackIcon } from '../../component-assets/track_delivery_icon.svg';
import { ReactComponent as ScheduleIcon } from '../../component-assets/schedule_delivery_icon.svg';
import { ReactComponent as SocialIcon } from '../../component-assets/social_media_icon.svg';
import { ReactComponent as MealIcon } from '../../component-assets/meal_setting_icon.svg';

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  const iconArray = [
    <DashboardIcon />,
    <CustomerIcon />,
    <DriverIcon />,
    <TrackIcon />,
    <ScheduleIcon />,
    <SocialIcon />,
    <MealIcon />
  ];

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Dashboard', 'Customers', 'Driver', 'Deliveries', 'Social Media', 'Meal Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {iconArray[index % iconArray.length]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}
