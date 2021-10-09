// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      primary: '#3785F7',
      secondary: '#F6C54C',
    },
  },
});

export default theme;
