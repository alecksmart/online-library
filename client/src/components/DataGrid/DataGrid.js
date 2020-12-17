import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import {
  Col,
  Input as Quickfilter,
  Row,
  Typography,
} from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';

import styles from './styles';

const { Title } = Typography;

export const DataGrid = ({
  title,
  quickfilter,
  setQuickfilter,
  columnDefs,
  rowData,
  context,
  frameworkComponents,
  Buttons,
  defaultColDef = {},
  t,
}) => (

  <Row type="flex" className={styles.rowWithGrid}>
    <Col flex={1} className={styles.colWithGrid}>
      <Title level={3}>{title}</Title>
      <div>
        {Buttons}
      </div>
      <div className={styles.gridToolbar}>
        <Quickfilter
          value={quickfilter}
          placeholder={t('Start typing to filter')}
          onChange={(e) => setQuickfilter(e.target.value)}
          addonAfter={<ClearOutlined onClick={() => setQuickfilter('')} />}
        />
      </div>
      <div className={cx('ag-theme-alpine', styles.divWithGrid)}>
        <AgGridReact
          defaultColDef={{
            sortable: true,
            suppressMenu: true,
            resizable: true,
            ...defaultColDef,
          }}
          columnDefs={columnDefs}
          quickFilterText={quickfilter}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
          context={context}
          suppressCellSelection
        />
      </div>
    </Col>
  </Row>
);

DataGrid.defaultProps = {
  context: {},
  frameworkComponents: {},
  defaultColDef: {},
  Buttons: null,
};

DataGrid.propTypes = {
  quickfilter: PropTypes.string.isRequired,
  setQuickfilter: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  defaultColDef: PropTypes.object,
  columnDefs: PropTypes.array.isRequired,
  rowData: PropTypes.array.isRequired,
  context: PropTypes.object,
  frameworkComponents: PropTypes.object,
  title: PropTypes.string.isRequired,
  Buttons: PropTypes.any,
};

export default DataGrid;
