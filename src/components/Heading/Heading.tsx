import React, { ReactNode } from 'react';
import cn from 'classnames';

import './Heading.styles.scss';

interface IHeading {
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  tag,
  children,
  className = '',
}: IHeading): JSX.Element => {
  switch (tag) {
    case 'h1':
      return <h1 className={cn('heading--h1', className)}>{children}</h1>;
    case 'h2':
      return <h2 className={cn('heading--h2', className)}>{children}</h2>;
    case 'h3':
      return <h3 className={cn('heading--h3', className)}> {children}</h3>;
    case 'h4':
      return <h3 className={cn('heading--h4', className)}> {children}</h3>;
    default:
      return <></>;
  }
};
