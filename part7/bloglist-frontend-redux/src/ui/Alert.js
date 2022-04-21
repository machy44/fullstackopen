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

export const Alert = ({ status, message }) => {
  return (
    <CAlert status={status}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </CAlert>
  );
};
