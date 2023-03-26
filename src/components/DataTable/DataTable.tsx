import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { deleteTableRow } from '../../api/tableData';
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

  const mutation = useMutation({
    mutationFn: (id: string) => deleteTableRow(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: () => {
      toast.error('Oops! Something went wrong...');
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
      mutation.mutate(deleteId);
    }

    setOpenConfirmation(false);
  };

  const handleCancelClick = () => {
    setOpenConfirmation(false);
    setDeleteId(null);
  };

  return (
    <Sheet sx={{ minWidth: 1200 }}>
      <Table stickyHeader hoverRow stripe="odd">
        <thead>
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th></th>
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="sm" variant="plain" color="neutral" onClick={() => handleEditClick(row)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="soft" color="danger" onClick={() => handleDeleteClick(row.id)}>
                    Delete
                  </Button>
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
          <Typography id="alert--modal-description" textColor="text.tertiary" mb={3}>
            Are you sure you want to delete this data?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="plain" color="neutral" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleConfirmationClick}>
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
};
