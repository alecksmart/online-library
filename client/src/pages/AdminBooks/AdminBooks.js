import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { EDIT_MODE } from 'config/constants';
import { Formik } from 'formik';
import {
  Form,
  FormItem,
  Input,
  ResetButton,
  Select,
  SubmitButton,
} from 'formik-antd';
import {
  ExclamationCircleOutlined, PlusOutlined, UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Modal,
  Row,
  Typography,
  Upload,
} from 'antd';
import * as yup from 'yup';
import {
  authorName,
  description,
  shelfId,
  title,
} from 'validators/book';
import get from 'lodash/get';
import isNull from 'lodash/isNull';
// import debounce from 'lodash/debounce';
import { crudRenderer, getGridContext } from 'components/CellRenderer/CrudCellRenderer';
import { checkboxRenderer } from 'components/CellRenderer/CheckboxCellRenderer';
import DataGrid from 'components/DataGrid';
import { useTranslation } from 'react-i18next';

import columnDefs from './columnDefs';
import styles from './styles';

const { Title } = Typography;
const { Option } = Select;

export const AdminBooks = ({
  bookDelete,
  bookGet,
  bookList,
  shelfList,
  bookPersist,
  bookClear,
  entry,
  entryList,
  spinEntry,
  shelfOptions,
  headers,
}) => {
  const { t } = useTranslation();
  const [quickfilter, setQuickfilter] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [coverFileList, setCoverFileList] = useState([]);
  const [pdfFileList, setPdfFileList] = useState([]);
  const { confirm } = Modal;

  const callback = (id = null) => {
    bookList();
    setEditMode(false);

    if (!isNull(id)) {
      bookClear();
      bookGet({
        id,
        callback: () => setTimeout(() => {
          setEditMode(EDIT_MODE.UPDATE);
        }, 100),
      });
    }
  };

  useEffect(() => {
    bookList();
    shelfList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCoverFileList(!entry.cover ? [] : [
      {
        uid: '-1',
        status: 'done',
        url: `/books/${entry.cover}`,
      },
    ]);
    setPdfFileList(!entry.cover ? [] : [
      {
        uid: '-1',
        name: entry.file,
        status: 'done',
        url: `/books/${entry.file}`,
      },
    ]);
    // eslint-disable-next-line
  }, [entry]);

  let initialValues = {
    title: get(entry, 'title', ''),
    authorName: get(entry, 'authorName', ''),
    description: get(entry, 'description', ''),
    ShelfId: get(entry, 'ShelfId', null),
  };
  if (editMode === EDIT_MODE.UPDATE) {
    initialValues = { ...initialValues, id: get(entry, 'id', '') };
  }

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
    bookPersist({
      editMode,
      postData: values,
      callback,
    });
    setEditMode(false);
    actions.resetForm();

    return {};
  };

  const validate = async (values) => {
    const errors = {};
    const toCheck = {
      title: title(t),
      description: description(t),
      authorName: authorName(t),
      ShelfId: shelfId(t),
    };

    const schema = yup.object()
      .shape(toCheck);

    await schema.validate(values, { abortEarly: false })
      .catch((err) => {
        err.inner.forEach((v) => {
          errors[v.path] = v.message;
        });
      });

    return errors;
  };

  const confirmDelete = ({ onOk }) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: t('Please confirm deleting book'),
      onOk,
    });
  };

  const onEntryNew = () => {
    bookClear();
    setEditMode(false);
    setTimeout(() => {
      setEditMode(EDIT_MODE.CREATE);
    }, 100);
  };

  const onEntryEdit = ({ value }) => {
    bookClear();
    setEditMode(false);
    bookGet({
      id: value,
      callback: () => setTimeout(() => {
        setEditMode(EDIT_MODE.UPDATE);
      }, 100),
    });
  };

  const onEntryDelete = ({ value }) => {
    bookClear();
    setEditMode(false);
    const onOk = () => {
      bookDelete({ id: value, callback });
    };
    confirmDelete({ onOk });
  };

  const coverUploadChange = (info) => {
    let lst = [];
    const e = info.fileList[info.fileList.length - 1] || null;
    if (!isNull(e)) {
      lst = [e];
      if (e.status === 'done') {
        bookList();
      }
    }
    setCoverFileList(lst);
  };

  const pdfUploadChange = (info) => {
    let lst = [];
    const e = info.fileList[info.fileList.length - 1] || null;
    if (!isNull(e)) {
      lst = [e];
      if (e.status === 'done') {
        bookList();
      }
    }
    setPdfFileList(lst);
  };

  const formTitle = editMode === EDIT_MODE.CREATE ? t('New Book') : t('Update Book');
  const submitButton = editMode === EDIT_MODE.CREATE ? t('Create') : t('Update');

  return (
    <div className={styles.page}>
      <Title level={2}>{t('Book Management')}</Title>
      {!!editMode && (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
          <Form className={styles.formik} labelCol={{ xs: 8 }} wrapperCol={{ xs: 20 }}>
            <div className={styles.form}>
              <Title level={4}>{formTitle}</Title>
              <FormItem name="title" label={t('Title')}>
                <Input name="title" placeholder={t('Title')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="authorName" label={t('Author')}>
                <Input name="authorName" placeholder={t('Author')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="ShelfId" label={t('Shelf')}>
                <Select name="ShelfId">
                  {
                    shelfOptions.map((v, i) => <Option key={`${i}`} value={v.id}>{v.name}</Option>)
                  }
                </Select>
              </FormItem>
              <FormItem name="description" label={t('Description')}>
                <Input.TextArea name="description" placeholder={t('Description')} disabled={spinEntry} />
              </FormItem>
              <Row className={styles.rowWithMargin}>
                <Col offset={8}>
                  <SubmitButton loading={spinEntry}>{submitButton}</SubmitButton>
                  <ResetButton>{t('Reset')}</ResetButton>
                  <Button onClick={() => setEditMode(false)}>{t('Cancel')}</Button>
                </Col>
              </Row>
              {editMode === EDIT_MODE.UPDATE && (
                <div className={styles.rowWithMargin}>
                  <FormItem name="coverFile" label={t('Upload Book Cover JPG')}>
                    <Upload
                      accept=".jpg,.jpeg"
                      name="coverJpg"
                      multiple={false}
                      action={`/api/admin/book/cover/${get(entry, 'id', '')}`}
                      headers={{ ...headers }}
                      fileList={coverFileList}
                      listType="picture-card"
                      onChange={coverUploadChange}
                      showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
                      progress="line"
                    >
                      <div>
                        <PlusOutlined />
                        <div className="ant-upload-text">{t('Upload')}</div>
                      </div>
                    </Upload>
                  </FormItem>
                  <FormItem name="pdfFile" label={t('Upload Book PDF')}>
                    <Upload
                      accept=".pdf"
                      name="filePdf"
                      multiple={false}
                      action={`/api/admin/book/pdf/${get(entry, 'id', '')}`}
                      headers={{ ...headers }}
                      fileList={pdfFileList}
                      listType="text"
                      onChange={pdfUploadChange}
                      showUploadList={{
                        showPreviewIcon: false,
                        showRemoveIcon: false,
                        showDownloadIcon: false,
                        downloadIcon: false,
                      }}
                      progress="line"
                    >
                      <Button>
                        <UploadOutlined />
                        {t('Upload')}
                      </Button>
                    </Upload>
                  </FormItem>
                </div>
              )}
            </div>
          </Form>
        </Formik>
      )}
      <DataGrid
        title={t('List Books')}
        quickfilter={quickfilter}
        setQuickfilter={setQuickfilter}
        columnDefs={columnDefs(t)}
        rowData={entryList}
        context={getGridContext(onEntryEdit, onEntryDelete)}
        frameworkComponents={{ crudRenderer: crudRenderer(t), checkboxRenderer }}
        Buttons={(<Button type="primary" size="small" onClick={() => onEntryNew()}>{t('New Book')}</Button>)}
        t={t}
      />
    </div>
  );
};

AdminBooks.defaultProps = { };

AdminBooks.propTypes = {
  bookDelete: PropTypes.func.isRequired,
  bookClear: PropTypes.func.isRequired,
  bookGet: PropTypes.func.isRequired,
  bookList: PropTypes.func.isRequired,
  shelfList: PropTypes.func.isRequired,
  bookPersist: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryList: PropTypes.array.isRequired,
  shelfOptions: PropTypes.array.isRequired,
  spinEntry: PropTypes.bool.isRequired,
  headers: PropTypes.object.isRequired,
};

export default AdminBooks;
