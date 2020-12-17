import get from 'lodash/get';

const columnDefs = (t) => [
  {
    headerName: t('Id'),
    field: 'id',
    width: 80,
  },
  {
    headerName: t('Title'),
    field: 'title',
    width: 150,
  },
  {
    headerName: t('Author'),
    field: 'authorName',
    width: 150,
  },
  {
    headerName: t('Description'),
    field: 'description',
    width: 150,
  },
  {
    headerName: t('Cover'),
    field: 'cover',
    width: 100,
    cellRenderer: 'checkboxRenderer',
  },
  {
    headerName: t('File'),
    field: 'file',
    width: 100,
    cellRenderer: 'checkboxRenderer',
  },
  {
    headerName: t('Shelf'),
    field: 'ShelfId',
    width: 150,
    valueGetter: (params) => get(params, 'data.Shelf.name', ''),
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
