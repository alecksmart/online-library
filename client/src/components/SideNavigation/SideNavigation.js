import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { paths } from 'config/routes';
import { menuConfig } from 'config/navigation';
import {
  BookOutlined,
  LaptopOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './styles';

const { SubMenu } = Menu;

export const SideNavigation = ({
  isLoggedIn,
  isAdmin,
  shelves,
  t,
}) => {
  const { routes } = paths;
  const { myProfile, manage } = menuConfig;
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const getDefaultOpen = () => {
    if (selected.indexOf('/my-') !== -1) {
      return 'sub2';
    }
    if (selected.indexOf('/admin-') !== -1) {
      return 'sub3';
    }

    return 'sub1';
  };

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={[getDefaultOpen()]}
      className={styles.menu}
      defaultSelectedKeys={[routes.root]}
      selectedKeys={[selected]}
    >
      <SubMenu key="sub1" icon={<BookOutlined />} title={t('Library')}>
        <Menu.Item key={routes.root}>
          <NavLink to={routes.root} className="nav-text">
            {t('All Books')}
          </NavLink>
        </Menu.Item>
        {
          shelves.map((v) => (
            <Menu.Item key={`/shelf/${v.id}`}>
              <NavLink to={`/shelf/${v.id}`} className="nav-text">
                {`${v.name} (${v.cntBooks})`}
              </NavLink>
            </Menu.Item>
          ))
        }
      </SubMenu>
      {isLoggedIn && (
      <SubMenu key="sub2" icon={<UserOutlined />} title={t('My Profile')}>
        {myProfile.map((v) => (
          <Menu.Item key={routes[v].root}>
            <NavLink to={routes[v].root} className="nav-text">
              {t(routes[v].title)}
            </NavLink>
          </Menu.Item>
        ))}
        <Menu.Item key="/my-books">
          <NavLink to="/my-books" className="nav-text">
            {t('My Books')}
          </NavLink>
        </Menu.Item>
      </SubMenu>
      )}
      {isLoggedIn && isAdmin && (
      <SubMenu key="sub3" icon={<LaptopOutlined />} title={t('Management')}>
        {manage.map((v) => (
          <Menu.Item key={routes[v].root}>
            <NavLink to={routes[v].root} className="nav-text">
              {t(routes[v].title)}
            </NavLink>
          </Menu.Item>
        ))}
      </SubMenu>
      )}
    </Menu>
  );
};

SideNavigation.defaultProps = {};
SideNavigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  shelves: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default SideNavigation;
