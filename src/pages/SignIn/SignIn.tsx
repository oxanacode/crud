import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { HOST, AUTH, BASE_PATH } from '../../constants/HOST';

import { ROUTES } from '../../constants/ROUTES';

type FormData = {
  login: string;
  password: string;
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const auth = localStorage.getItem('pryaniky_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth !== 'undefined') {
      navigate(ROUTES.MAIN.path);
    }
  }, [auth, navigate]);

  const { isLoading, mutate: signIn } = useMutation('signIn', (data: FormData) =>
    axios
      .post(`${HOST}${BASE_PATH}${AUTH}`, data)
      .then((response) => {
        if (response.data.data) {
          localStorage.setItem('pryaniky_token', response.data.data.token);
          navigate(ROUTES.MAIN.path);
        } else {
          toast.error(response.data.error_text);
        }

        console.log(response);
      })
      .catch(() => {
        toast.error('Access deny');
      })
  );

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
    signIn(data);
  };

  const errorLine = (
    <Typography level="body2" color="danger" sx={{ height: 22, m: 0 }}>
      Field is required
    </Typography>
  );

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 320,
        p: 2,
        mx: 'auto',
        mt: 20,
        borderRadius: 'sm',
      }}
    >
      <div>
        <Typography level="h4" component="h1" textAlign="center">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body2" textAlign="center">
          Sign in to continue
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <FormControl>
          <FormLabel>Login</FormLabel>
          <Input
            variant="outlined"
            color="neutral"
            {...register('login', { required: true })}
            sx={{ mb: errors.login ? 0 : 2.75 }}
          />
        </FormControl>
        {errors.login && errorLine}
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            variant="outlined"
            color="neutral"
            {...register('password', { required: true })}
            sx={{ mb: errors.password ? 0 : 2.75 }}
          />
        </FormControl>
        {errors.password && errorLine}
        <Button type="submit" loading={isLoading} sx={{ mt: 1, width: '100%' }}>
          Submit
        </Button>
      </form>
    </Sheet>
  );
};
