import React from 'react';
import { Button } from 'antd';

import styles from './styles';

export const crudRenderer = (t) => (params) => {
  const { context } = params;

  return (
    <span>
      <Button
        type="primary"
        className={styles.crudButton}
        size="small"
        onClick={() => context.onEdit(params)}
      >
        {t('Edit')}
      </Button>
      <Button
        danger
        size="small"
        className={styles.crudButton}
        onClick={() => context.onDelete(params)}
      >
        {t('Delete')}
      </Button>
    </span>
  );
};

export const getGridContext = (onEdit, onDelete) => ({ onEdit, onDelete });
