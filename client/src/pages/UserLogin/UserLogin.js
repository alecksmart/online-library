import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
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
import { email, passwordForLogin as password } from 'validators/user';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const { Title } = Typography;

export const UserLogin = ({ login, logout }) => {
  const location = useLocation();
  const history = useHistory();
  const callback = () => history.push(PAGES.ROOT);
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname === PAGES.LOGOUT) {
      logout({ callback });
    }
    // eslint-disable-next-line
  }, [location]);

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
    login({ postData: values, callback });
    actions.resetForm();

    return {};
  };

  const validate = async (values) => {
    const errors = {};
    const schema = yup.object()
      .shape({
        email: email(t),
        password: password(t),
      });
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
            <Title level={4}>{t('User Login')}</Title>
            <FormItem name="email" label={t('Email')}>
              <Input name="email" placeholder={t('Email')} />
            </FormItem>
            <FormItem name="password" label={t('Password')}>
              <Input.Password name="password" placeholder={t('Password')} />
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

UserLogin.defaultProps = {};
UserLogin.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserLogin;
