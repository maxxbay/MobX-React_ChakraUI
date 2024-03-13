import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const toastSuccess = (message) => {
  toast({
    title: message,
    status: 'success',
    duration: 2000,
    isClosable: true,
  });
};

export const toastError = (message) => {
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 2000,
    isClosable: true,
  });
};
