import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { IState } from '../../models/state';

interface ICState {
  open: boolean;
}

const mapState = (state: IState): ICState => ({
  open: state.viewPoll.voteModalOpen,
});

function CastVoteModal({ open }: ICState): JSX.Element {
  return (
    <Dialog open={open}>
      <h1>Vote Modal</h1>
    </Dialog>
  );
}

export default connect(mapState)(CastVoteModal);
