const columnDefs = (t) => [
  {
    headerName: t('Id'),
    field: 'id',
    width: 62,
  },
  {
    headerName: t('Email'),
    field: 'email',
    width: 150,
  },
  {
    headerName: t('First Name'),
    field: 'firstName',
    width: 150,
  },
  {
    headerName: t('Last Name'),
    field: 'lastName',
    width: 150,
  },
  {
    headerName: t('Admin'),
    field: 'isAdmin',
    width: 100,
    cellRenderer: 'checkboxRenderer',
  },
  {
    headerName: t('Actions'),
    field: 'id',
    width: 160,
    cellRenderer: 'crudRenderer',
    sortable: false,
    resizable: false,
  },
];

export default columnDefs;
