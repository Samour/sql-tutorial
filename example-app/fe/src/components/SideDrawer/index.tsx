import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { mainViewService } from '../../services/MainViewService';
import { MainListContext } from '../../models/state';

export default function SideDrawer(): JSX.Element {
  return (
    <div className="side-drawer">
      <List className="drawer-menu">
        <ListItem button onClick={mainViewService.navigateMenu(MainListContext.USERS)}>
          Users
        </ListItem>
        <ListItem button onClick={mainViewService.navigateMenu(MainListContext.POLLS)}>
          Polls
        </ListItem>
      </List>
    </div>
  );
}
