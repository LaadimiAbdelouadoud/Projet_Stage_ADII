import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import './Menu.css'; // Import your CSS file

export default function Menu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleItemClick = (text) => {
    // Handle functionality based on the item clicked
    switch (text) {
      case 'PagePricipale' :
        window.location.href = '/PagePrincipale';
        break;
      case 'Se deconnecter':
        window.location.href = '/';
        
        console.log('Logging out...');
        break;
      case 'Gestion Utilisateurs':
        window.location.href = '/ListerUtilisateurs';
        console.log('Managing users...');
        break;
      case 'Gestion Profiles':
        window.location.href = "/ListerProfiles"
        console.log('Managing profiles...');
        break;
      case 'Gestion Decisions':
        window.location.href = '/ListerDecisions';
        console.log('Managing decisions...');
        break;
      case 'Historique':
      window.location.href = '/ListerHitorique';
        break;
      default:
        break;
    }

    // Close the drawer after handling the click
    setOpen(false);
  };

  return (
    <div className="drawerContainer">
      <button className="drawerButton" onClick={toggleDrawer(true)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box className="drawerList">
          <List>
            {[
              'PagePricipale',
              'Se deconnecter',
              'Gestion Utilisateurs',
              'Gestion Profiles',
              'Gestion Decisions',
              'Historique',
            ].map((text, index) => (
              <ListItem
                key={text}
                component="div"
                onClick={() => handleItemClick(text)}
                className="drawerListItem"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <LogoutIcon />}
                    {index === 2 && <GroupIcon />}
                    {index === 3 && <BadgeIcon />}
                    {index === 4 && <FactCheckIcon />}
                    {index === 5 && <HistoryIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
