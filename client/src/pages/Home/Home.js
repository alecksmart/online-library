import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
  Tooltip,
  Typography,
} from 'antd';
import {
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import LibraryToolbar from 'components/LibraryToolbar';
import LibraryCard from 'components/LibraryCard';
import { DEFAULT_PAGE_SIZE } from 'config/constants';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const { Title } = Typography;

export const Home = ({
  match,
  getShelfNameById,
  showInfoNotification,
  homeAddToMy,
  homeRemoveFromMy,
  homeList,
  entryList,
  total,
  pageSize,
  loading,
  forId,
}) => {
  const [page, setPage] = useState(1);
  const [s, setS] = useState('');
  const [ord, setOrd] = useState('createdAt');
  const [dir, setDir] = useState('DESC');
  const { params: { shelfId }} = match;
  const { t } = useTranslation();

  const getQuery = () => {
    const values = [];
    if (page > 1) {
      values.push(`page=${page}`);
    }
    if (s > '') {
      values.push(`s=${s}`);
    }
    if (ord !== 'createdAt') {
      values.push(`ord=${ord}`);
    }
    if (dir === 'DESC') {
      values.push('dir=DESC');
    } else {
      values.push('dir=ASC');
    }
    if (forId > 0) {
      values.push(`forId=${forId}`);
    }
    if (shelfId > 0) {
      values.push(`shelfId=${shelfId}`);
    }

    return values.join('&');
  };

  useEffect(() => {
    homeList({ query: getQuery() });
    // eslint-disable-next-line
  }, [
    page,
    s,
    ord,
    dir,
    shelfId,
  ]);

  const onPageChange = (num) => setPage(num);

  const onTextFilter = (value) => {
    setS(value);
    setPage(1);
  };

  const onDirChange = (value) => {
    setDir(value);
    setPage(1);
  };

  const onSortChange = (value) => {
    setOrd(value);
    if (value !== 'createdAt') {
      setDir('ASC');
    }
    setPage(1);
  };

  const callback = () => homeList({ query: getQuery() });

  const onBookAdd = (id) => {
    showInfoNotification(t('The book is being added to your library'));
    homeAddToMy({ id, callback });
  };

  const onBookRemove = (id) => {
    showInfoNotification(t('The book is being removed from your library'));
    homeRemoveFromMy({ id, callback });
  };

  const getCardActions = (v) => {
    if (!forId) {
      return null;
    }

    return v.isMy ? [
      <Tooltip title={t('Click to remove from your books')}>
        <MinusSquareOutlined key="add" onClick={() => onBookRemove(v.id)} />
      </Tooltip>,
    ] : [
      <Tooltip title={t('Click to add to your books')}>
        <PlusSquareOutlined key="add" onClick={() => onBookAdd(v.id)} />
      </Tooltip>,
    ];
  };

  const renderPagination = () => (
    <Pagination
      onChange={onPageChange}
      showSizeChanger={false}
      defaultPageSize={pageSize || DEFAULT_PAGE_SIZE}
      total={total}
      disabled={loading}
      current={page}
    />
  );

  return (
    <>
      <Title level={2}>
        {t('Library Books')}
        {`${(shelfId > 0 ? `: ${getShelfNameById(shelfId)}` : '')}`}
      </Title>
      <LibraryToolbar
        onTextFilter={onTextFilter}
        onSortChange={onSortChange}
        onDirChange={onDirChange}
        orderBy={ord}
        direction={dir}
        searchString={s}
        t={t}
      />
      {renderPagination()}
      <div className={styles.bookList}>
        {
          entryList.map((v, i) => (
            <LibraryCard
              card={v}
              loading={loading}
              getCardActions={getCardActions}
              key={i}
            />
          ))
      }
      </div>
      {renderPagination()}
    </>

  );
};

Home.defaultProps = {};
Home.propTypes = {
  showInfoNotification: PropTypes.func.isRequired,
  homeList: PropTypes.func.isRequired,
  homeAddToMy: PropTypes.func.isRequired,
  getShelfNameById: PropTypes.func.isRequired,
  homeRemoveFromMy: PropTypes.func.isRequired,
  entryList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  forId: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
};

export default Home;
