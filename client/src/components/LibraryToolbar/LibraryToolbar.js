import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { BOOKS_ORDER_BY } from 'config/constants';

import styles from './styles';

const { Option } = Select;

export const LibraryToolbar = ({
  onTextFilter,
  onSortChange,
  onDirChange,
  orderBy,
  direction,
  searchString,
  t,
}) => (
  <Row className={styles.toolbar}>
    <Col className={styles.toolbarSection}>
      <Input
        value={searchString}
        placeholder={t('Start typing to filter')}
        onChange={(e) => onTextFilter(e.target.value)}
        addonAfter={<ClearOutlined onClick={() => onTextFilter('')} />}
      />
    </Col>
    <Col className={styles.toolbarSection}>
      <span className={styles.toolbarSection}>{t('Sort by')}</span>
      <Select defaultValue={orderBy} className={styles.toolbarSelect} onChange={onSortChange}>
        {
          BOOKS_ORDER_BY.map((v, i) => <Option key={`${i}`} value={v.value}>{t(v.label)}</Option>)
        }
      </Select>
    </Col>
    <Col>
      <span className={styles.toolbarSection}>{t('Sort order')}</span>
      <Radio.Group value={direction} onChange={(e) => onDirChange(e.target.value)}>
        <Radio.Button value="ASC">{t('ascending')}</Radio.Button>
        <Radio.Button value="DESC">{t('descending')}</Radio.Button>
      </Radio.Group>
    </Col>
  </Row>
);

LibraryToolbar.defaultProps = { };

LibraryToolbar.propTypes = {
  onTextFilter: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onDirChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default LibraryToolbar;
