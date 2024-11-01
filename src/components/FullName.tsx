import React, { FC,Fragment } from 'react';

type Props ={
    firstName:string;
    lastName:string;
}

const FullName:FC<Props> = ({lastName,firstName}) => {
  return (
    <Fragment>{lastName}{' '}{firstName}</Fragment>
  )
}

export default FullName;