import { css } from 'emotion/macro';

const rowWithGrid = css`
  display: flex;
  height: 620px;
  margin: 20px 0;
`;

const colWithGrid = css`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
`;

const divWithGrid = css`
  flex: 1;
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
  padding:8px;
  background-color: #f0efef;
  border: 1px solid #CCCCCC;
`;

const gridToolbar = css`
  padding: 8px 0 4px 0;
  max-width: 400px;
`;

export default {
  rowWithGrid,
  colWithGrid,
  divWithGrid,
  gridToolbar,
};
