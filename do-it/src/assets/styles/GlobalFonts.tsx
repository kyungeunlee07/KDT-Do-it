import { createGlobalStyle } from 'styled-components';
import Font_B from '../src/assets/fonts/NanumSquareB.otf';
import Font_R from '../src/assets/fonts/NanumSquareR.otf';

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: "Bold";
  src: local("Font_test"), url(${Font_B}) format('opentype');
  font-weight: bold;
}
@font-face {
  font-family: "Regular";
  src: local("Font_test"), url(${Font_R}) format('opentype');
  font-weight: normal;
}

body {
  font-family: "Regular";
}

strong, b {
  font-family: "Bold";
}
`;