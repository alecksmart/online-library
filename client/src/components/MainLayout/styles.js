import { css, injectGlobal } from '@emotion/css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .ant-layout-header {
    padding: 0 20px !important;
  }
`;

const logo = css`
  width: auto;
  height: 31px;
  margin: 8px 24px 0 0;
  float: left;
`;

const logoIcon = css`
  font-size: 32px;
  color: white;
`;

const siteName = css`
  text-align: center;
  padding: 24px;
`;

const layout = css`
  min-height: 100vh;
`;

const content = css`
  padding: 24px;
  margin: 0;
  min-height: 280px;
`;

const languageSwitcher = css`
  padding: 16px 0;
`;

export default {
  logoIcon,
  logo,
  siteName,
  content,
  languageSwitcher,
  layout,
};
