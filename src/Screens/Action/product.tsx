/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Addproduct from '../../asset/svg/box.svg';
import CustomHeader from '../../Model/CustomHeader';
import Customitem from '../../Model/CustomItem';
import ListproductIcon from '../../asset/svg/quality.svg';
import { ProductNavigationPramaList } from '../../navigation/types';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
type Props ={
    navigation: StackNavigationProp<ProductNavigationPramaList,'ProductScreen'>
}
const ProductScreen: React.FC<Props> = ({navigation}:Props )=>{
    return (
        <View>
        <CustomHeader onpress={()=>{navigation.goBack();}} title="Quản lý sản phẩm"/>
        <ScrollView  style={{marginTop:20}} >
            <Customitem onpress={()=>{navigation.navigate('LisProductNavigation');}} icon= {<ListproductIcon  width={reponsivewidth(40)} height={reponsiveheight(40)}/>
            }
             title="Xem danh sách sản phẩm"/>
                <Customitem icon= {<Addproduct  width={reponsivewidth(40)} height={reponsiveheight(40)}/>
            }
             title="Thêm sản phẩm"
             onpress={()=>{navigation.navigate('AddproductScreen');}}
             />
        </ScrollView>
        </View>
    );
};
export default ProductScreen;
