import React from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IState } from '../../models/state';
import { getManager } from '../../services/manager';
import DataList from './DataList';

interface ICState {
  title: string;
}

const mapState = (state: IState): ICState => ({
  title: state.mainList.title,
});

function MainDataList({ title }: ICState): JSX.Element {
  return (
    <div>
      <h2>{title}</h2>
      <DataList />
      <Fab color="primary" className="fab" onClick={getManager().getMainViewService().openAddModal()}>
        <Add />
      </Fab>
    </div>
  );
}

export default connect(mapState)(MainDataList);
