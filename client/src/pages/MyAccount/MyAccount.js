import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { PAGES } from 'config/constants';
import { Formik } from 'formik';
import {
  Form,
  FormItem,
  Input,
  ResetButton,
  SubmitButton,
} from 'formik-antd';
import {
  Button,
  Col,
  Row,
  Typography,
} from 'antd';
import * as yup from 'yup';
import {
  firstName,
  lastName,
  password,
  passwordForLogin,
} from 'validators/user';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const { Title } = Typography;

export const MyAccount = ({ userSelfUpdate, userProfile }) => {
  const history = useHistory();
  const callback = () => history.push(PAGES.LOGIN);
  const { t } = useTranslation();

  const initialValues = {
    password: '',
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    confirmPassword: '',
    oldPassword: '',
  };

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
    userSelfUpdate({ postData: values, callback });
    actions.resetForm();

    return {};
  };

  const validate = async (values) => {
    const errors = {};
    let toCheck = {
      oldPassword: passwordForLogin(t),
      firstName: firstName(t),
      lastName: lastName(t),
    };
    if (values.password > '') {
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

  return (
    <div className={styles.page}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <Form
          className={styles.formik}
          labelCol={{ xs: 8 }}
          wrapperCol={{ xs: 20 }}
        >
          <div className={styles.dummyFlex} />
          <div className={styles.form}>
            <Title level={4}>{t('Update Account')}</Title>
            <FormItem name="firstName" label={t('First Name')}>
              <Input name="firstName" placeholder={t('First Name')} />
            </FormItem>
            <FormItem name="lastName" label={t('Last Name')}>
              <Input name="lastName" placeholder={t('Last Name')} />
            </FormItem>
            <FormItem name="oldPassword" label={t('Old Password')}>
              <Input.Password name="oldPassword" placeholder={t('Old Password')} />
            </FormItem>
            <FormItem name="password" label={t('Password')}>
              <Input.Password name="password" placeholder={t('New Password')} />
            </FormItem>
            <FormItem name="confirmPassword" label={t('Confirm')}>
              <Input.Password name="confirmPassword" placeholder={t('Confirm New Password')} />
            </FormItem>
            <Row className={styles.rowWithMargin}>
              <Col offset={8}>
                <Button.Group>
                  <ResetButton>{t('Reset')}</ResetButton>
                  <SubmitButton>{t('Submit')}</SubmitButton>
                </Button.Group>
              </Col>
            </Row>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

MyAccount.defaultProps = {};
MyAccount.propTypes = {
  userSelfUpdate: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

export default MyAccount;
