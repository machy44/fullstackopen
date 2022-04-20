import React from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';
import { Button } from 'ui';

export const Alert = ({ body, isOpen, onSubmit, onCancel }) => {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
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
      </AlertDialog>
    </>
  );
};
