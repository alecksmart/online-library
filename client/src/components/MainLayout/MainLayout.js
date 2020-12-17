import React, { useState } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';
import { Layout, Typography } from 'antd';
import TopNavigation from 'components/TopNavigation';
import SideNavigation from 'components/SideNavigation';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { BookOutlined } from '@ant-design/icons';
import { languageOptions } from 'config/i18n';

import styles from './styles';

const {
  Header,
  Content,
  Sider,
} = Layout;
const { Title } = Typography;

export const MainLayout = ({
  isLoggedIn,
  isAdmin,
  setLanguage,
  lng,
  shelves,
  t,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout className={styles.layout}>
      <Header className="header">
        <div className={styles.logo}>
          <BookOutlined className={styles.logoIcon} />
        </div>
        <TopNavigation
          isLoggedIn={isLoggedIn}
          t={t}
        />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
        >
          <SideNavigation
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            shelves={shelves}
            t={t}
          />
          <LanguageSwitcher
            defaultValue={lng}
            options={languageOptions}
            className={styles.languageSwitcher}
            setLanguage={setLanguage}
          />
        </Sider>
        <Layout
          style={{ padding: '0 24px 24px' }}
        >
          <Title level={1} className={styles.siteName}>
            {t('Online Library')}
          </Title>
          <Content className={cx('site-layout-background', styles.content)}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

MainLayout.defaultProps = {
  isLoggedIn: false,
  isAdmin: false,
  className: '',
};
MainLayout.propTypes = {
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  setLanguage: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default MainLayout;
