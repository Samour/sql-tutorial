import React from 'react';
import FlexBase, { appendClassName, IFlexProps } from '../FlexBase';

export default function FlexRow(props: IFlexProps): JSX.Element {
  return <FlexBase {...props} className={appendClassName(props.className, 'flex-row')}></FlexBase>;
}
