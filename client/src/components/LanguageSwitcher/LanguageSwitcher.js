import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { cx } from '@emotion/css';

import styles from './styles';

const { Option } = Select;

export const LanguageSwitcher = ({
  defaultValue,
  options,
  className,
  setLanguage,
}) => {
  const handleChange = (value) => {
    setLanguage(value);
    setTimeout(() => localStorage.setItem('_localPrefLang', value), 10);
  };

  return (
    <div className={cx(styles.LanguageSwitcher, className)}>
      <Select defaultValue={defaultValue} onChange={handleChange}>
        {options.map((v, i) => (
          <Option key={i} value={v.value}>
            {v.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

LanguageSwitcher.defaultProps = { className: '' };

LanguageSwitcher.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  setLanguage: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
