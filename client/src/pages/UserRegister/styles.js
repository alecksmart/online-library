import { css } from '@emotion/css/macro';

const page = css`
  margin-top: 4px;
`;

const dummyFlex = css`
 flex: 1
`;

const form = css`
 background: white;
 flex: 1;
 padding: 40px;

 h4.ant-typography, .ant-typography h4 {
   text-align: center;
 }
`;

const rowWithMargin = css`
 margin-top: 20px;
`;

const formik = css`
 display: grid;
 grid-template-columns: 1fr 1fr 1fr;
`;

export default {
  page,
  dummyFlex,
  formik,
  form,
  rowWithMargin,
};
