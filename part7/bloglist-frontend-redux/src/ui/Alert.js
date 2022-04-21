import React from 'react';
import {
  AlertDialog as CAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDescription,
  AlertIcon,
  Alert as CAlert
} from '@chakra-ui/react';

import { Button } from 'ui';
import { PropTypes } from 'prop-types';

export const AlertDialog = ({ body, isOpen, onSubmit, onCancel }) => {
  const cancelRef = React.useRef();

  return (
    <CAlertDialog
      motionPreset="slideInBottom"
      onClose={onCancel}
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button colorScheme="red" ml={3} onClick={onSubmit}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </CAlertDialog>
  );
};

export const Alert = ({ status, message, dataTestId }) => {
  return (
    <CAlert status={status} data-testid={dataTestId}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </CAlert>
  );
};

Alert.propTypes = {
  status: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  dataTestId: PropTypes.string
};
