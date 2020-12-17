import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card, Skeleton, Space, Typography,
} from 'antd';

import styles from './styles';

const { Text } = Typography;

export const LibraryCard = ({
  card,
  loading,
  getCardActions,
}) => {
  const {
    cover, title, authorName, description, Shelf, id,
  } = card;

  return (
    <Card
      className={styles.card}
      hoverable
      cover={<img alt="example" src={`/books/${cover}`} />}
      actions={getCardActions(card)}
    >
      <Skeleton loading={loading} active>
        <Space direction="vertical">
          <Text strong>
            <Link to={`/book/${id}`}>{title}</Link>
          </Text>
          <Text underline>
            {authorName}
          </Text>
          <Text>
            {description}
          </Text>
          <Text disabled>
            {Shelf.name}
          </Text>
        </Space>
      </Skeleton>
    </Card>
  );
};

LibraryCard.defaultProps = { };

LibraryCard.propTypes = {
  card: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getCardActions: PropTypes.func.isRequired,
};

export default LibraryCard;
