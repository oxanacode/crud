import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useMutation, useQueryClient } from 'react-query';

import { toast } from 'react-toastify';

import { FormField } from './FormField';

import { createTableRow, setTableRow } from '../../api/tableData';
import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';
import { TABLE_COLUMNS, TableType, TABLE_COLUMNS_DATE } from '../../constants/TABLE_COLUMNS';
import { DataTableType } from '../DataTable';

type AddDataFormProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  value: DataTableType;
};

export const AddDataForm = ({ setOpenModal, value }: AddDataFormProps) => {
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || '';
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<DataTableType>();

  const mutation = useMutation({
    mutationFn: (newData: DataTableType) => {
      return value.id ? setTableRow(value.id, newData, accessToken) : createTableRow(newData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: () => {
      toast.error('Oops! Something went wrong...');
    },
  });

  const onSubmit: SubmitHandler<DataTableType> = (formData: DataTableType) => {
    TABLE_COLUMNS_DATE.map((field) => {
      formData[field] = `${new Date(formData[field]).toISOString()}\t`;
    });

    mutation.mutate(formData);

    setOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
      <Stack spacing={2}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {TABLE_COLUMNS.map((label: TableType) => (
            <FormField
              fieldLabel={label}
              isRequired={true}
              type={TABLE_COLUMNS_DATE.includes(label) ? 'datetime-local' : 'text'}
              register={register}
              value={value ? value[label] : ''}
              key={label}
            />
          ))}
        </Grid>
        <Button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
