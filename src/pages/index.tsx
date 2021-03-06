import React, { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';

import { Flex } from '@chakra-ui/layout';
import { Button, Stack, FormControl, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';
import { withSSTGuest } from '../utils/withSSRGuest';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const toast = useToast();
  const toastIdRef = React.useRef<any>();
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  const {
    reset,
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    const signInSuccess = await signIn(values);
    if (!signInSuccess) {
      reset({ password: '', email: values.email });
      return;
    }

    router.push('/dashboard');
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxW="360px"
        bg="gray.800"
        p="8"
        borderRadius="8px"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <FormControl>
            <Input
              name="email"
              type="text"
              label="E-mail"
              error={errors.email}
              {...register('email')}
            />
          </FormControl>
          <FormControl>
            <Input
              name="password"
              type="password"
              label="Password"
              error={errors.password}
              {...register('password')}
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="purple"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSTGuest(
  async (context) => {
    return { props: {} };
  }
);
