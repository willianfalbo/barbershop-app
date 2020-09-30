import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().min(3, 'At least 3 characters'),
  email: yup
    .string()
    .required('Email is a required field')
    .email('Must be a valid email'),
  password: yup.string().min(6, 'At least 6 characters'),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    shouldFocusError: false,
  });

  const onSubmit = (data: SignUpForm) => console.log(data);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Barbershop" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Name"
            register={register}
            error={errors?.name?.message}
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="Email"
            register={register}
            error={errors?.email?.message}
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Password"
            type="password"
            register={register}
            error={errors?.password?.message}
          />
          <Button type="submit">Register</Button>
        </form>
        <Link to="/">
          <FiArrowLeft />
          Already have an account? Sign In.
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
