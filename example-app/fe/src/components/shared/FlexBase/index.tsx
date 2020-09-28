import React, { ReactNode } from 'react';

export function appendClassName(className: string | undefined, append: string): string {
  if (className?.length) {
    return `${className} ${append}`;
  } else {
    return append;
  }
}

export interface IFlexProps {
  className?: string;
  reverse?: boolean;
  flexGrow?: boolean;
  spaceEvenly?: boolean;
  spaceBetween?: boolean;
  children: ReactNode | ReactNode[];
}

export default function FlexBase({
  className,
  reverse,
  flexGrow,
  spaceEvenly,
  spaceBetween,
  children
}: IFlexProps): JSX.Element {
  const classes = [];
  if (className) {
    classes.push(className);
  }
  if (reverse) {
    classes.push('reverse');
  }
  if (spaceEvenly) {
    classes.push('space-evenly');
  }
  if (spaceBetween) {
    classes.push('space-between');
  }
  if (flexGrow) {
    classes.push('flex-grow');
  }

  return <div className={classes.join(' ')}>{children}</div>;
}
