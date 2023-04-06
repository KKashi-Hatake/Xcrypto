import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert   
      pos={'fixed'}
      status={"error"}
      bottom={"10"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={'container.lg'}
    >
      <AlertIcon/>
        {message}
      
    </Alert>
  )
}

export default ErrorComponent