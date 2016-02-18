import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';


export const PMS_295_C = '#002856';//Dark Blue
export const PMS_288_C = '#002D73';//Less Dark Blue
export const PMS_2935_C = '#0055B8';//Blue
export const PMS_3005_C = '#0075C9';//Lighter Blue
export const PMS_801_C = '#0075C9';//Baby Blue
export const PMS_2985_C = '#57C1E8';//Turquoise
export const PMS_2975_C = '#98D5E9';//Sky Blue
export const PMS_430_C = '#7D868C';//Gray
export const WHITE = '#FFFFFF';//White... duh


const THEME = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'DIN Pro, sans-serif',
  palette: {
    primary1Color: PMS_295_C,  //Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: PMS_3005_C,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};



export const ROBOTO = {
  fontFamily: 'Roboto'
};



export const H1 = {
  color: THEME.palette.primary1Color
};

export default THEME;
