import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { paths } from 'config/routes';
import { navConfig } from 'config/navigation';

export const TopNavigation = ({ isLoggedIn, t }) => {
  const k = isLoggedIn ? 'isLogged' : 'isNotLogged';
  const { routes } = paths;
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[routes.root]}
      selectedKeys={[selected]}
    >
      <Menu.Item key={routes.root}>
        <NavLink to={routes.root} className="nav-text">
          {t('All Books')}
        </NavLink>
      </Menu.Item>
      {navConfig[k].map((v) => (
        <Menu.Item key={routes[v].root}>
          <NavLink to={routes[v].root} className="nav-text">
            {t(routes[v].title)}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

TopNavigation.defaultProps = { isLoggedIn: false };

TopNavigation.propTypes = {
  isLoggedIn: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default TopNavigation;
