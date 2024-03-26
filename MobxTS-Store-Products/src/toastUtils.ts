import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const toastSuccess = (message: string): void => {
  toast({
    title: message,
    status: 'success',
    duration: 2000,
    isClosable: true,
  });
};

export const toastError = (message: string): void => {
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 2000,
    isClosable: true,
  });
};
