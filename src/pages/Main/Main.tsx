import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getTableData } from '../../api/tableData';
import { AddDataModal } from '../../components/AddDataModal';
import { DataTable, DataTableType } from '../../components/DataTable';
import { ErrorFullPage } from '../../components/ErrorFullPage';
import { LoadingProgressFullPage } from '../../components/LoadingProgressFullPage';

import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';
import { ROUTES } from '../../constants/ROUTES';
import { EMPTY_TABLE_COLUMNS } from '../../constants/TABLE_COLUMNS';

export const Main = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowValue, setRowValue] = useState<DataTableType>(EMPTY_TABLE_COLUMNS);
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || '';

  useEffect(() => {
    if (!accessToken) {
      navigate(ROUTES.SIGN_IN.path);
    }
  }, [accessToken, navigate]);

  const { isLoading, isError, data } = useQuery('tableData', () => getTableData(accessToken));

  const handleClick = () => {
    setRowValue(EMPTY_TABLE_COLUMNS);
    setOpenModal(true);
  };

  if (isLoading) {
    return <LoadingProgressFullPage />;
  }

  if (isError) {
    return <ErrorFullPage />;
  }

  const tableData: DataTableType[] = !data.error_code ? data.data : [];

  return (
    <Box component="main" sx={{ display: 'flex', flexDirection: 'column', maxWidth: '90%', mx: 'auto', my: 4 }}>
      <Button
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ ml: 'auto' }}
        startDecorator={<AddRoundedIcon />}
      >
        Add new data
      </Button>
      <Box sx={{ mt: 4, width: '100%' }}>
        <Sheet variant="outlined" sx={{ maxWidth: '100%', overflowX: 'auto', borderRadius: 'sm' }}>
          <DataTable tableData={tableData} setOpenModal={setOpenModal} setRowValue={setRowValue} />
        </Sheet>
      </Box>
      <AddDataModal isOpen={openModal} setOpenModal={setOpenModal} value={rowValue} />
    </Box>
  );
};
