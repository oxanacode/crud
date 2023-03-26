import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { deleteTableRow } from '../../api/tableData';
import { INFO_MESSAGE } from '../../constants/INFO_MESSAGE';
import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';

import { TableType, TABLE_COLUMNS, TABLE_COLUMNS_DATE } from '../../constants/TABLE_COLUMNS';

export type DataTableType = {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

type DataTableProps = {
  tableData: DataTableType[];
  setRowValue: Dispatch<SetStateAction<DataTableType>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const DataTable = ({ tableData, setRowValue, setOpenModal }: DataTableProps) => {
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || '';
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { mutate: deleteRow, isLoading } = useMutation({
    mutationFn: (id: string) => deleteTableRow(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
      setOpenConfirmation(false);
      toast.success(INFO_MESSAGE.DATA_CHANGE);
    },
    onError: () => {
      setOpenConfirmation(false);
      toast.error(INFO_MESSAGE.WENT_WRONG);
    },
  });

  const convertDate = (str: string) => {
    const dateTime = str.split('T');
    const date = dateTime[0].split('-').reverse().join('.');
    const time = dateTime[1].split('.')[0].slice(0, 5);

    return `${date} ${time}`;
  };

  const handleEditClick = (rowData: DataTableType) => {
    setRowValue(rowData);
    setOpenModal(true);
  };

  const handleDeleteClick = (rowId: string) => {
    setOpenConfirmation(true);
    setDeleteId(rowId);
  };

  const handleConfirmationClick = () => {
    if (deleteId) {
      deleteRow(deleteId);
    }
  };

  const handleCancelClick = () => {
    setOpenConfirmation(false);
    setDeleteId(null);
  };

  return (
    <Sheet sx={{ minWidth: 1200 }}>
      <Table
        stickyHeader
        borderAxis="bothBetween"
        hoverRow
        stripe="odd"
        sx={{
          textAlign: 'center',
          '& tr > *:last-child': {
            position: 'sticky',
            right: 0,
            width: 100,
            bgcolor: 'var(--TableCell-headBackground)',
          },
        }}
      >
        <thead>
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th key={column} style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                {column}
              </th>
            ))}
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: DataTableType) => (
            <tr key={row.id}>
              {TABLE_COLUMNS.map((column: TableType) => (
                <td key={column}>{`${
                  TABLE_COLUMNS_DATE.includes(column) ? convertDate(row[column]) : row[column]
                }`}</td>
              ))}
              <td>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton
                    aria-label="Edit row"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => handleEditClick(row)}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete row"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    <ClearRoundedIcon color="error" />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <Typography id="alert-modal-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
            Confirmation
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography id="alert-modal-description" textColor="text.tertiary" mb={3}>
            Are you sure you want to delete this data?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="plain" color="neutral" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={handleConfirmationClick}
              loading={isLoading}
              loadingPosition="end"
            >
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
};
