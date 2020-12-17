import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';

// import styleIs from './styles';

export const Spinner = ({ isVisible, t }) => (!isVisible ? null : (
  <Spin tip={t('Loading...')}>
    <Alert
      message={t('Please wait...')}
      description={t('Loading application components and data...')}
      type="info"
    />
  </Spin>
));

Spinner.defaultProps = {};

Spinner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default Spinner;
