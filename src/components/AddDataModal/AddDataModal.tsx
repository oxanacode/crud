import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { Dispatch, SetStateAction } from 'react';

import { AddDataForm } from '../../components/AddDataForm';
import { DataTableType } from '../DataTable';

type AddDataModalProps = {
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  value: DataTableType;
};

export const AddDataModal = ({ isOpen, setOpenModal, value }: AddDataModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') setOpenModal(false);
      }}
    >
      <ModalDialog
        aria-labelledby="add-new-data-modal"
        aria-describedby="add-new-data-modal"
        sx={{ maxWidth: 500, overflowY: 'auto' }}
      >
        <ModalClose />

        <Typography id="add-new-data-modal-title" component="h2">
          {value.id ? 'Edit data' : 'Add new data'}
        </Typography>

        <Typography id="basic-modal-dialog-description" textColor="text.tertiary" sx={{ mb: 2 }}>
          Fill in the information
        </Typography>

        <AddDataForm setOpenModal={setOpenModal} value={value} />
      </ModalDialog>
    </Modal>
  );
};
