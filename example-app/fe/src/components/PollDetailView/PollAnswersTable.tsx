import React from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell } from '@material-ui/core';
import { PollUserAnswer } from '../../models/dtos';
import { IState } from '../../models/state';

interface ICState {
  responses: PollUserAnswer[];
}

const mapState = (state: IState): ICState => ({
  responses: state.viewPoll.responses,
});

function PollAnswersTable({ responses }: ICState): JSX.Element {
  const rows = responses.map((r) => (
    <TableRow>
      <TableCell>{r.option.title}</TableCell>
      <TableCell>{r.user.firstName} {r.user.lastName}</TableCell>
    </TableRow>
  ));

  return (
    <Table>
      {rows}
    </Table>
  );
}

export default connect(mapState)(PollAnswersTable);
