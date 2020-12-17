import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
  Tooltip,
  Typography,
} from 'antd';
import {
  FilePdfOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import LibraryToolbar from 'components/LibraryToolbar';
import LibraryCard from 'components/LibraryCard';
import { DEFAULT_PAGE_SIZE } from 'config/constants';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const { Title } = Typography;

export const MyBooks = ({
  showInfoNotification,
  homeRemoveFromMy,
  myBooksList,
  entryList,
  total,
  pageSize,
  loading,
}) => {
  const [page, setPage] = useState(1);
  const [s, setS] = useState('');
  const [ord, setOrd] = useState('createdAt');
  const [dir, setDir] = useState('DESC');
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

    return values.join('&');
  };

  useEffect(() => {
    myBooksList({ query: getQuery() });
    // eslint-disable-next-line
  }, [
    page,
    s,
    ord,
    dir,
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

  const callback = () => myBooksList({ query: getQuery() });

  const onBookRemove = (id) => {
    showInfoNotification(t('The book is being removed from your library'));
    homeRemoveFromMy({ id, callback });
  };

  const getCardActions = (v) => ([
    <Tooltip title={t('Click to remove from your books')}>
      <MinusSquareOutlined key="add" onClick={() => onBookRemove(v.id)} />
    </Tooltip>,
    <Tooltip title={t('Click to download your book')}>
      <a
        href={`/books/${v.file}`}
        download={`${v.title}, ${v.authorName}.pdf`}
      >
        <FilePdfOutlined />
      </a>
    </Tooltip>,
  ]);

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
      <Title level={2}>{t('My Books')}</Title>
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

MyBooks.defaultProps = {};

MyBooks.propTypes = {
  showInfoNotification: PropTypes.func.isRequired,
  myBooksList: PropTypes.func.isRequired,
  homeRemoveFromMy: PropTypes.func.isRequired,
  entryList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MyBooks;
