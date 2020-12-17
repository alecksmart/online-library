import React from 'react';
import { Checkbox } from 'antd';

import styles from './styles';

export const checkboxRenderer = (params) => (
  <div className={styles.checkboxWrapper}>
    <Checkbox
      checked={params.value}
    />
  </div>
);
