import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { postAuthFormData } from '../../api/postAuthFormData';
import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';
import { ROUTES } from '../../constants/ROUTES';

export type AuthFormData = {
  login: string;
  password: string;
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  const { isLoading, mutate: signIn } = useMutation({
    mutationFn: (formData: AuthFormData) => postAuthFormData(formData),
    onError: () => {
      toast.error('Oops! Please try again later...');
    },
    onSuccess: (data) => {
      if (!data?.data.error_code) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data?.data.data.token);
        navigate(ROUTES.MAIN.path);
      } else {
        toast.error(data?.data.error_text);
      }
    },
  });

  const onSubmit: SubmitHandler<AuthFormData> = (formData: AuthFormData) => {
    signIn(formData);
  };

  const errorLine = (
    <Typography level="body2" color="danger" sx={{ height: 22, m: 0 }}>
      Field is required
    </Typography>
  );

  return (
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
  );
};
