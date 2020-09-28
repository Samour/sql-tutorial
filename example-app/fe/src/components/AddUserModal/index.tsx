import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Dialog, FormControl, InputLabel, Input, ButtonGroup, Button } from '@material-ui/core';
import { IState } from '../../models/state';
import { openAddUserModalEvent } from '../../events/OpenAddUserModalEvent';
import { updateAddUserFieldEvent } from '../../events/UpdateAddUserFieldEvent';
import { usersService } from '../../services/UsersService';
import FlexRow from '../shared/FlexRow';

interface ICState {
  open: boolean;
  submitInProgress: boolean;
  email: string;
  firstName: string;
  lastName: string;
}

const mapState = (state: IState): ICState => ({
  open: state.addUserModal.open,
  submitInProgress: state.addUserModal.submitInProgress,
  email: state.addUserModal.email,
  firstName: state.addUserModal.firstName,
  lastName: state.addUserModal.lastName,
});

interface IActions {
  updateEmail: (email: string) => void;
  updateFirstName: (firstName: string) => void;
  updateLastName: (lastName: string) => void;
  closeModal: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  updateEmail: (email) => dispatch(updateAddUserFieldEvent('email', email)),
  updateFirstName: (firstName) => dispatch(updateAddUserFieldEvent('firstName', firstName)),
  updateLastName: (lastName) => dispatch(updateAddUserFieldEvent('lastName', lastName)),
  closeModal: () => dispatch(openAddUserModalEvent(false)),
});

function AddUserModal({
  open,
  submitInProgress,
  email,
  firstName,
  lastName,
  updateEmail,
  updateFirstName,
  updateLastName,
  closeModal,
}: ICState & IActions): JSX.Element {
  return (
    <Dialog open={open}>
      <form className="modal-form">
        <FlexRow>
          <FormControl className="input-row">
            <InputLabel>First Name:</InputLabel>
            <Input value={firstName} disabled={submitInProgress} onChange={(e) => updateFirstName(e.target.value)} />
          </FormControl>
        </FlexRow>
        <FlexRow>
          <FormControl className="input-row">
            <InputLabel>Last Name:</InputLabel>
            <Input value={lastName} disabled={submitInProgress} onChange={(e) => updateLastName(e.target.value)} />
          </FormControl>
        </FlexRow>
        <FlexRow>
          <FormControl className="input-row">
            <InputLabel>Email:</InputLabel>
            <Input value={email} disabled={submitInProgress} onChange={(e) => updateEmail(e.target.value)} />
          </FormControl>
        </FlexRow>
        <FlexRow reverse className="button-row">
          <ButtonGroup>
            <Button disabled={submitInProgress} onClick={closeModal}>Cancel</Button>
            <Button variant="contained"
              color="primary"
              disabled={submitInProgress}
              onClick={usersService.submitNewUser()}>
              Create
            </Button>
          </ButtonGroup>
        </FlexRow>
      </form>
    </Dialog>
  );
}

export default connect(mapState, mapActions)(AddUserModal);
