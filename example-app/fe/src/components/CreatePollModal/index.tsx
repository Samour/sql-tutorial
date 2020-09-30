import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Dialog, Button, ButtonGroup, FormControl, InputLabel, Input, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IState } from '../../models/state';
import { openCreatePollModalEvent } from '../../events/OpenCreatePollModalEvent';
import { createPollAddOptionEvent } from '../../events/CreatePollAddOptionEvent';
import { createPollRemoveOptionEvent } from '../../events/CreatePollRemoveOptionEvent';
import { createPollOptionValueEvent } from '../../events/CreatePollOptionValueEvent';
import { getManager } from '../../services/manager';
import FlexRow from '../shared/FlexRow';
import OptionEntry from './OptionEntry';
import { createPollUpdateTitleEvent } from '../../events/CreatePollUpdateTitleEvent';

interface ICState {
  open: boolean;
  title: string;
  options: string[];
  maySubmit: boolean;
  submitInProgress: boolean;
}

const mapState = (state: IState): ICState => ({
  open: state.createPollModal.open,
  title: state.createPollModal.title,
  options: state.createPollModal.options,
  maySubmit: !!state.activeUser.activeUserId,
  submitInProgress: state.createPollModal.submitInProgress,
});

interface IActions {
  updateTitle: (title: string) => void;
  addOption: () => void;
  removeOption: (option: number) => () => void;
  updateOption: (option: number) => (value: string) => void;
  closeModal: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  updateTitle: (title) => dispatch(createPollUpdateTitleEvent(title)),
  addOption: () => dispatch(createPollAddOptionEvent()),
  removeOption: (option) => () => dispatch(createPollRemoveOptionEvent(option)),
  updateOption: (option) => (value) => dispatch(createPollOptionValueEvent(option, value)),
  closeModal: () => dispatch(openCreatePollModalEvent(false)),
});

function CreatePollModal({
  open,
  title,
  options,
  maySubmit,
  submitInProgress,
  updateTitle,
  addOption,
  removeOption,
  updateOption,
  closeModal,
}: ICState & IActions): JSX.Element {
  const optionInputs = options.map((o, i) => (
    <OptionEntry value={o} disabled={submitInProgress} onChange={updateOption(i)} onRemove={removeOption(i)} />
  ));

  return (
    <Dialog open={open}>
      <form className="modal-form">
        <FlexRow>
          <FormControl className="input-row">
            <InputLabel>Poll Title</InputLabel>
            <Input value={title} disabled={submitInProgress} onChange={(e) => updateTitle(e.target.value)} />
          </FormControl>
        </FlexRow>
        {optionInputs}
        <FlexRow>
          <IconButton disabled={submitInProgress} onClick={addOption}>
            <Add />
          </IconButton>
        </FlexRow>
        <FlexRow className="button-row" reverse>
          <ButtonGroup>
            <Button disabled={submitInProgress} onClick={closeModal}>Close</Button>
            <Button disabled={!maySubmit || submitInProgress}
              variant="contained"
              color="primary"
              onClick={() => getManager().getPollsService().submitCreatePoll()}>
              Create
            </Button>
          </ButtonGroup>
        </FlexRow>
      </form>
    </Dialog>
  );
}

export default connect(mapState, mapActions)(CreatePollModal);
