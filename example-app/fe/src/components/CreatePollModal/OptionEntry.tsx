import React from 'react';
import FlexRow from '../shared/FlexRow';
import { InputLabel, Input, IconButton, FormControl } from '@material-ui/core';
import { Remove } from '@material-ui/icons';

interface IProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export default function OptionEntry({ value, disabled, onChange, onRemove }: IProps): JSX.Element {
  return (
    <FlexRow>
      <FlexRow flexGrow>
        <FormControl className="input-row">
          <InputLabel>Option</InputLabel>
          <Input value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        </FormControl>
      </FlexRow>
      <FlexRow className="input-remove-btn-container">
        <IconButton disabled={disabled} onClick={() => onRemove()}>
          <Remove />
        </IconButton>
      </FlexRow>
    </FlexRow>
  );
}
