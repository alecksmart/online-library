import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { EDIT_MODE } from 'config/constants';
import { Formik } from 'formik';
import {
  Checkbox,
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
  email,
  firstName,
  lastName,
  password,
} from 'validators/user';
import get from 'lodash/get';
import { crudRenderer, getGridContext } from 'components/CellRenderer/CrudCellRenderer';
import { checkboxRenderer } from 'components/CellRenderer/CheckboxCellRenderer';
import DataGrid from 'components/DataGrid';
import { useTranslation } from 'react-i18next';

import columnDefs from './columnDefs';
import styles from './styles';

const { Title } = Typography;

export const AdminUsers = ({
  userDelete,
  userGet,
  userList,
  userPersist,
  userClear,
  entry,
  entryList,
  spinEntry,
  ownId,
}) => {
  const { t } = useTranslation();
  const [quickfilter, setQuickfilter] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { confirm, warning } = Modal;

  const callback = () => {
    userList();
    setEditMode(false);
  };

  useEffect(() => {
    userList();
    // eslint-disable-next-line
  }, []);

  let initialValues = {
    email: get(entry, 'email', ''),
    firstName: get(entry, 'firstName', ''),
    lastName: get(entry, 'lastName', ''),
    isAdmin: get(entry, 'isAdmin', false),
    password: '',
    confirmPassword: '',
  };
  if (editMode === EDIT_MODE.UPDATE) {
    initialValues = { ...initialValues, id: get(entry, 'id', '') };
  }

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
    userPersist({
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
    let toCheck = {
      email: email(t),
      firstName: firstName(t),
      lastName: lastName(t),
    };
    if (values.password > '' || editMode === EDIT_MODE.CREATE) {
      toCheck = { ...toCheck, password: password(t, values.confirmPassword) };
    }

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

  const infoSelf = () => {
    warning({
      title: t('Warning'),
      content: t('You cannot delete or edit yourself...'),
    });
  };

  const confirmDelete = ({ onOk }) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: t('Please confirm deleting user'),
      onOk,
    });
  };

  const onEntryNew = () => {
    userClear();
    setEditMode(false);
    setTimeout(() => {
      setEditMode(EDIT_MODE.CREATE);
    }, 100);
  };

  const onEntryEdit = ({ value }) => {
    if (ownId === value) {
      infoSelf();

      return;
    }
    userClear();
    setEditMode(false);
    userGet({
      id: value,
      callback: () => setTimeout(() => {
        setEditMode(EDIT_MODE.UPDATE);
      }, 100),
    });
  };

  const onEntryDelete = ({ value }) => {
    if (ownId === value) {
      infoSelf();

      return;
    }
    userClear();
    setEditMode(false);
    const onOk = () => {
      userDelete({ id: value, callback });
    };
    confirmDelete({ onOk });
  };

  const formTitle = editMode === EDIT_MODE.CREATE ? t('New User') : t('Update User');
  const submitButton = editMode === EDIT_MODE.CREATE ? t('Create') : t('Update');

  return (
    <div className={styles.page}>
      <Title level={2}>{t('User Management')}</Title>
      {!!editMode && (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
          <Form className={styles.formik} labelCol={{ xs: 8 }} wrapperCol={{ xs: 20 }}>
            <div className={styles.form}>
              <Title level={4}>{formTitle}</Title>
              <FormItem name="email" label={t('Email')}>
                <Input name="email" placeholder={t('Email')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="firstName" label={t('First Name')}>
                <Input name="firstName" placeholder={t('First Name')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="lastName" label={t('Last Name')}>
                <Input name="lastName" placeholder={t('Last Name')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="password" label={t('Password')}>
                <Input.Password name="password" placeholder={t('New Password')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="confirmPassword" label={t('Confirm')}>
                <Input.Password name="confirmPassword" placeholder={t('Confirm New Password')} disabled={spinEntry} />
              </FormItem>
              <FormItem name="isAdmin" label={t('Administrator')}>
                <Checkbox name="isAdmin" disabled={spinEntry} />
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
        title={t('List Users')}
        quickfilter={quickfilter}
        setQuickfilter={setQuickfilter}
        columnDefs={columnDefs(t)}
        rowData={entryList}
        context={getGridContext(onEntryEdit, onEntryDelete)}
        frameworkComponents={{ crudRenderer: crudRenderer(t), checkboxRenderer }}
        Buttons={(<Button type="primary" size="small" onClick={() => onEntryNew()}>{t('New User')}</Button>)}
        t={t}
      />
    </div>
  );
};

AdminUsers.defaultProps = {};

AdminUsers.propTypes = {
  userDelete: PropTypes.func.isRequired,
  userClear: PropTypes.func.isRequired,
  userGet: PropTypes.func.isRequired,
  userList: PropTypes.func.isRequired,
  userPersist: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryList: PropTypes.array.isRequired,
  spinEntry: PropTypes.bool.isRequired,
  ownId: PropTypes.number.isRequired,
};

export default AdminUsers;
