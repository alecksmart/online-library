const columnDefs = (t) => [
  {
    headerName: t('Id'),
    field: 'id',
    width: 62,
  },
  {
    headerName: t('Name'),
    field: 'name',
    width: 250,
  },
  {
    headerName: t('Books Count'),
    field: 'cntBooks',
    width: 150,
  },
  {
    headerName: t('Description'),
    field: 'description',
    width: 150,
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
