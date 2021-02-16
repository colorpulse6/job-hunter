import { css } from "styled-components";

//mobile first approach min-width
const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '430px',
    tabletS: '480px',
    tabletM: '660px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,

};

