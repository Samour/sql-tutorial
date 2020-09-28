import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../models/state';
import MainDataList from '../MainDataList';
import ManageUserView from '../ManageUserView';
import PollDetailView from '../PollDetailView';

interface ICState {
  manageUserOpen: boolean;
  viewPollOpen: boolean;
}

const mapState = (state: IState): ICState => ({
  manageUserOpen: !!state.manageUser.userId,
  viewPollOpen: !!state.viewPoll.pollId,
});

function MainView({ manageUserOpen, viewPollOpen }: ICState): JSX.Element {
  const InnerComponent = () => {
    if (manageUserOpen) {
      return <ManageUserView />;
    } else if (viewPollOpen) {
      return <PollDetailView />;
    } else {
      return <MainDataList />;
    }
  };

  return (
    <div className="main-content">
      {InnerComponent()}
    </div>
  );
}

export default connect(mapState)(MainView);
