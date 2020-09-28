import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { IState, PollViewMode } from '../../models/state';
import { clearViewPollEvent } from '../../events/ClearViewPollEvent';
import { pollsService } from '../../services/PollsService';
import FlexRow from '../shared/FlexRow';
import FlexColumn from '../shared/FlexColumn';
import PollResultTable from './PollResultTable';
import PollAnswersTable from './PollAnswersTable';
import CastVoteModal from '../CastVoteModal';
import { openVoteModalEvent } from '../../events/OpenVoteModalEvent';

interface ICState {
  pollId: string;
  title: string;
  viewMode: PollViewMode;
  voteEnabled: boolean;
  variant: (mode: PollViewMode) => 'contained' | 'outlined';
  color: (mode: PollViewMode) => 'primary' | 'default';
}

const mapState = (state: IState): ICState => ({
  pollId: state.viewPoll.pollId as string,
  title: state.viewPoll.title,
  viewMode: state.viewPoll.viewMode,
  voteEnabled: !!state.activeUser.activeUserId,
  variant: (mode) => mode === state.viewPoll.viewMode ? 'contained' : 'outlined',
  color: (mode) => mode === state.viewPoll.viewMode ? 'primary' : 'default',
});

interface IActions {
  openVoteModal: () => void;
  closeView: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  openVoteModal: () => dispatch(openVoteModalEvent(true)),
  closeView: () => dispatch(clearViewPollEvent()),
});

function PollDetailsView({
  pollId,
  title,
  viewMode,
  voteEnabled,
  variant,
  color,
  openVoteModal,
  closeView,
}: ICState & IActions): JSX.Element {
  useEffect(() => {
    pollsService.viewPollResponses(pollId, viewMode);
  }, [pollId]);

  const tabButton = (mode: PollViewMode, text: string): JSX.Element => (
    <Button variant={variant(mode)} color={color(mode)} onClick={() => pollsService.viewPollResponses(pollId, mode)}>
      {text}
    </Button>
  );

  const table = (): JSX.Element | null => {
    if (viewMode === PollViewMode.COUNT) {
      return <PollResultTable />;
    } else if (viewMode === PollViewMode.ALL) {
      return <PollAnswersTable />;
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <FlexColumn>
        <FlexRow>
          <FlexColumn className="detail-controls">
            <FlexRow className="gutter-vertical" spaceBetween>
              <Button variant="contained" color="primary" disabled={!voteEnabled} onClick={openVoteModal}>
                Cast Vote
              </Button>
              <Button variant="contained" className="button-danger" onClick={() => pollsService.deletePoll(pollId)}>
                Delete
              </Button>
            </FlexRow>
            <FlexRow className="gutter-vertical" spaceEvenly>
              <Button variant="contained" onClick={closeView}>Back</Button>
            </FlexRow>
          </FlexColumn>
        </FlexRow>
        <FlexRow className="gutter-vertical">
          <ButtonGroup>
            {tabButton(PollViewMode.COUNT, 'Results')}
            {tabButton(PollViewMode.ALL, 'All Responses')}
          </ButtonGroup>
        </FlexRow>
        {table()}
      </FlexColumn>
      <CastVoteModal />
    </div>
  );
}

export default connect(mapState, mapActions)(PollDetailsView);
