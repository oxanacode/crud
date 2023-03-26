import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import { UseFormRegister } from 'react-hook-form';

import { TableType, TABLE_COLUMNS_DATE } from '../../constants/TABLE_COLUMNS';

import { DataTableType } from '../DataTable';

type FormFieldProps = {
  fieldLabel: TableType;
  isRequired: boolean;
  type: string;
  register: UseFormRegister<DataTableType>;
  value: string;
};

export const FormField = ({ fieldLabel, isRequired, type, register, value }: FormFieldProps) => {
  const setValue = (value: string) => {
    return TABLE_COLUMNS_DATE.includes(fieldLabel) ? value.slice(0, 16) : value;
  };

  return (
    <Grid xs={12} md={6}>
      <FormControl>
        <FormLabel required={isRequired} sx={{ textTransform: 'capitalize' }}>
          {fieldLabel}
        </FormLabel>
        <Input type={type} {...register(fieldLabel, { required: isRequired })} defaultValue={setValue(value)} />
      </FormControl>
    </Grid>
  );
};
