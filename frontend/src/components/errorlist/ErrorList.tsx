import * as React from 'react';
import { Form } from 'react-bootstrap';

interface ErrorListProps {
  errors: string[] | null | undefined;
}

const ErrorList = ({ errors }: ErrorListProps) => {

  const renderErrMsg = errors?.map(
    (msg, index) => {
      return <Form.Text key={index} className='error-message'>{msg}</Form.Text>
    }
  );

  return ( 
    <div className='error-list'>
      {renderErrMsg}
    </div>
  );
}
 
export default ErrorList;