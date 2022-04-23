/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 830;
const {width,height} = Dimensions.get('window');
export function reponsivewidth(value = 0)
{
    return (width * value) / DESIGN_WIDTH;
}
export function reponsiveheight(value = 0)
{
    return (height * value) / DESIGN_HEIGHT;
}
export function getwidth()
{
    return width;
}
export function getheight()
{
    return height;
}

