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
  SubmitButton,
} from 'formik-antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Modal,
  Row,
  Typography,
} from 'antd';
import * as yup from 'yup';
import {
  description,
  name,
} from 'validators/shelf';
import get from 'lodash/get';
import { crudRenderer, getGridContext } from 'components/CellRenderer/CrudCellRenderer';
import { checkboxRenderer } from 'components/CellRenderer/CheckboxCellRenderer';
import DataGrid from 'components/DataGrid';
import { useTranslation } from 'react-i18next';

import columnDefs from './columnDefs';
import styles from './styles';

const { Title } = Typography;

export const AdminShelves = ({
  shelfDelete,
  shelfGet,
  shelfList,
  shelfPersist,
  shelfClear,
  entry,
  entryList,
  spinEntry,
}) => {
  const { t } = useTranslation();
  const [quickfilter, setQuickfilter] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { confirm, warning } = Modal;

  const callback = () => {
    shelfList();
    setEditMode(false);
  };

  useEffect(() => {
    shelfList();
    // eslint-disable-next-line
  }, []);

  let initialValues = {
    name: get(entry, 'name', ''),
    description: get(entry, 'description', ''),
  };
  if (editMode === EDIT_MODE.UPDATE) {
    initialValues = { ...initialValues, id: get(entry, 'id', '') };
  }

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
    shelfPersist({
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
      name: name(t),
      description: description(t),
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
      content: t('Please confirm deleting shelf'),
      onOk,
    });
  };

  const infoRestrict = () => {
    warning({
      title: t('Warning'),
      content: t('You cannot delete the shelf when it contains books'),
    });
  };

  const onEntryNew = () => {
    shelfClear();
    setEditMode(false);
    setTimeout(() => {
      setEditMode(EDIT_MODE.CREATE);
    }, 100);
  };

  const onEntryEdit = ({ value }) => {
    shelfClear();
    setEditMode(false);
    shelfGet({
      id: value,
      callback: () => setTimeout(() => {
        setEditMode(EDIT_MODE.UPDATE);
      }, 100),
    });
  };

  const onEntryDelete = (params) => {
    if (params.data.cntBooks > 0) {
      infoRestrict();

      return;
    }
    shelfClear();
    setEditMode(false);
    const onOk = () => {
      shelfDelete({ id: params.value, callback });
    };
    confirmDelete({ onOk });
  };

  const formTitle = editMode === EDIT_MODE.CREATE ? t('New Shelf') : t('Update Shelf');
  const submitButton = editMode === EDIT_MODE.CREATE ? t('Create') : t('Update');

  return (
    <div className={styles.page}>
      <Title level={2}>{t('Shelf Management')}</Title>
      {!!editMode && (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
          <Form className={styles.formik} labelCol={{ xs: 8 }} wrapperCol={{ xs: 20 }}>
            <div className={styles.form}>
              <Title level={4}>{formTitle}</Title>
              <FormItem name="name" label={t('Name')}>
                <Input name="name" placeholder={t('Name')} disabled={spinEntry} />
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
            </div>
          </Form>
        </Formik>
      )}
      <DataGrid
        title={t('List Shelves')}
        quickfilter={quickfilter}
        setQuickfilter={setQuickfilter}
        columnDefs={columnDefs(t)}
        rowData={entryList}
        context={getGridContext(onEntryEdit, onEntryDelete)}
        frameworkComponents={{ crudRenderer: crudRenderer(t), checkboxRenderer }}
        Buttons={(<Button type="primary" size="small" onClick={() => onEntryNew()}>{t('New Shelf')}</Button>)}
        t={t}
      />
    </div>
  );
};

AdminShelves.defaultProps = {};

AdminShelves.propTypes = {
  shelfDelete: PropTypes.func.isRequired,
  shelfClear: PropTypes.func.isRequired,
  shelfGet: PropTypes.func.isRequired,
  shelfList: PropTypes.func.isRequired,
  shelfPersist: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryList: PropTypes.array.isRequired,
  spinEntry: PropTypes.bool.isRequired,
};

export default AdminShelves;
