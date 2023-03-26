export type TableType =
  | 'companySigDate'
  | 'companySignatureName'
  | 'documentName'
  | 'documentStatus'
  | 'documentType'
  | 'employeeNumber'
  | 'employeeSigDate'
  | 'employeeSignatureName';

export const TABLE_COLUMNS: TableType[] = [
  'companySigDate',
  'companySignatureName',
  'documentName',
  'documentStatus',
  'documentType',
  'employeeNumber',
  'employeeSigDate',
  'employeeSignatureName',
];

export const EMPTY_TABLE_COLUMNS = {
  id: '',
  companySigDate: '',
  companySignatureName: '',
  documentName: '',
  documentStatus: '',
  documentType: '',
  employeeNumber: '',
  employeeSigDate: '',
  employeeSignatureName: '',
};

export const TABLE_COLUMNS_DATE: TableType[] = ['companySigDate', 'employeeSigDate'];
