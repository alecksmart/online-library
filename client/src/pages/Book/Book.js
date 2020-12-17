import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'antd';
import LibraryCard from 'components/LibraryCard';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

export const Book = ({
  entryList,
  match,
}) => {
  const { params: { bookId }} = match;
  const book = entryList && entryList.filter((v) => parseInt(v.id, 10) === parseInt(bookId, 10))[0];
  const history = useHistory();
  const { t } = useTranslation();

  const backAction = () => {
    history.goBack();
  };

  return !entryList ? '' : (
    <>
      <Title level={2}>
        {book.authorName}
      </Title>
      <Title level={3}>
        {book.title}
      </Title>
      <LibraryCard
        card={book}
        loading={false}
        getCardActions={() => {}}
        key={1}
      />
      <Button onClick={backAction}>{t('Powrót')}</Button>
    </>
  );
};

Book.defaultProps = {};

Book.propTypes = {
  entryList: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

export default Book;
