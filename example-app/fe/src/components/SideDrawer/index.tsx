import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { getManager } from '../../services/manager';
import { MainListContext } from '../../models/state';

export default function SideDrawer(): JSX.Element {
  return (
    <div className="side-drawer">
      <List className="drawer-menu">
        <ListItem button onClick={getManager().getMainViewService().navigateMenu(MainListContext.USERS)}>
          Users
        </ListItem>
        <ListItem button onClick={getManager().getMainViewService().navigateMenu(MainListContext.POLLS)}>
          Polls
        </ListItem>
      </List>
    </div>
  );
}
