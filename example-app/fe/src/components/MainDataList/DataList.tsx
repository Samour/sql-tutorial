import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, CircularProgress } from '@material-ui/core';
import { ListItemResponse } from '../../models/dtos';
import { IState } from '../../models/state';
import { getManager } from '../../services/manager';

interface ICState {
  loading: boolean;
  items: ListItemResponse[];
}

const mapState = (state: IState): ICState => ({
  loading: state.mainList.loading,
  items: state.mainList.items,
});

function DataList({ loading, items }: ICState): JSX.Element {
  if (loading) {
    return <CircularProgress />;
  }

  const itemElements = items.map(({ id, displayTitle }, i) => (
    <ListItem key={id} button onClick={getManager().getMainViewService().openItemDetail(i)}>{displayTitle}</ListItem>
  ));

  return (
    <List className="data-list">
      {itemElements}
    </List>
  );
}

export default connect(mapState)(DataList);
