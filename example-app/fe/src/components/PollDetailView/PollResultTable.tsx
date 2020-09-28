import React from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell } from '@material-ui/core';
import { PollOptionResult } from '../../models/dtos';
import { IState } from '../../models/state';

interface ICState {
  results: PollOptionResult[];
}

const mapState = (state: IState): ICState => ({
  results: state.viewPoll.results,
});

function PollResultTable({ results }: ICState): JSX.Element {
  const rows = results.map((r) => (
    <TableRow>
      <TableCell>{r.option.title}</TableCell>
      <TableCell>{r.count}</TableCell>
    </TableRow>
  ));

  return (
    <Table>
      {rows}
    </Table>
  );
}

export default connect(mapState)(PollResultTable);
