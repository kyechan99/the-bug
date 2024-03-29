import { DefaultTheme } from "styled-components";

// Font
const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Lilita One', sans-serif`,
  },
  size: {
    sm: "0.5rem",
    base: "1rem",
    // lg: "2rem",
    // xl: "2.5rem",
    // title: "6rem",
  },
};
export type FontSizeTypes = typeof fonts;

// Color Theme
const colors = {
  primary: "#F0C40A",
  secondary: "#A3C2FF",
  warning: "#ff4f4f",
  grey: "#d6d6d6",
  black: "#181B22",
  bg: "#FFF",
};
export type ColorTypes = typeof colors;

// Responsive
const size = {
  only_mobile: "32rem",
  mobile: "576px",
  tablet: "768px",
  desktop: "992px",
  desktopLarge: "1200px",
};
const devices = {
  mobile: `@media only screen and (min-width: ${size.mobile})`,
  tablet: `@media only screen and (min-width: ${size.tablet})`,
  desktop: `@media only screen and (min-width: ${size.desktop})`,
  desktopLarge: `@media only screen and (min-width: ${size.desktopLarge})`,
  max_only_mobile: `@media only screen and (max-width: ${size.only_mobile})`,
  max_mobile: `@media only screen and (max-width: ${size.mobile})`,
  max_tablet: `@media only screen and (max-width: ${size.tablet})`,
  max_desktop: `@media only screen and (max-width: ${size.desktop})`,
  max_desktopLarge: `@media only screen and (max-width: ${size.desktopLarge})`,
};
export type DevicesTypes = typeof devices;

// Z-Order
const zIndex = {
  background_img: -1,
  modalBG: 100,
  modal: 101,
};
export type ZIndexTypes = typeof zIndex;

const theme: DefaultTheme = {
  colors,
  fonts,
  devices,
  zIndex,
};
export default theme;
