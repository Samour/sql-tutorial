import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Table, TableRow, TableCell } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { IState } from '../../models/state';
import { clearManageUserEvent } from '../../events/ClearManageUserEvent';
import { setActiveUserEvent } from '../../events/SetActiveUserEvent';
import { getManager } from '../../services/manager';
import { UserPollEntry } from '../../models/dtos';
import FlexRow from '../shared/FlexRow';
import FlexColumn from '../shared/FlexColumn';

interface ICState {
  userId: string;
  firstName: string;
  lastName: string;
  isActiveUser: boolean;
  polls: UserPollEntry[];
}

const mapState = (state: IState): ICState => ({
  userId: state.manageUser.userId as string,
  firstName: state.manageUser.firstName,
  lastName: state.manageUser.lastName,
  isActiveUser: state.manageUser.userId === state.activeUser.activeUserId,
  polls: state.manageUser.polls,
});

interface IActions {
  assumeIdentity: (userId: string) => () => void;
  closeView: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  assumeIdentity: (userId) => () => dispatch(setActiveUserEvent(userId)),
  closeView: () => dispatch(clearManageUserEvent()),
});

function ManageUserView({
  userId,
  firstName,
  lastName,
  polls,
  isActiveUser,
  assumeIdentity,
  closeView
}: ICState & IActions): JSX.Element {
  useEffect(() => {
    getManager().getUsersService().loadPollResponses(userId);
  }, [userId]);

  const UserIcon = (): JSX.Element | null => {
    if (isActiveUser) {
      return <Done />;
    } else {
      return null;
    }
  };

  const pollRows = polls.map(({ poll, option }) => (
    <TableRow key={poll.id}>
      <TableCell>{poll.title}</TableCell>
      <TableCell>{option.title}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <h1>{firstName} {lastName} <UserIcon /></h1>
      <FlexColumn className="detail-controls">
        <FlexRow className="gutter-vertical" spaceBetween>
          <Button variant="contained" color="primary" onClick={assumeIdentity(userId)}>Assume identity</Button>
          <Button className="button-danger"
            variant="contained"
            onClick={getManager().getUsersService().deleteUser(userId)}>
            Delete
            </Button>
        </FlexRow>
        <FlexRow className="gutter-vertical" spaceEvenly>
          <Button variant="contained" onClick={closeView}>Back</Button>
        </FlexRow>
      </FlexColumn>
      <h2>Poll Responses:</h2>
      <Table>
        {pollRows}
      </Table>
    </div>
  );
}

export default connect(mapState, mapActions)(ManageUserView);
