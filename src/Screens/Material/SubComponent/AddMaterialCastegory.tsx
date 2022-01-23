/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {CustomNotification} from '../../../Model/CustomNofication';
import {MaterialCategory} from '../../../Model/MaterialCategory';
import data from '../../../services/data';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
import BellNofi from '../../../asset/svg/bellnotification.svg';
type props = {
  visible: boolean;
  cancel: (value: any) => void;
};
const AddMaterialCategory: React.FC<props> = ({visible, cancel}: props) => {
  const [valueInput, setValueInput] = useState<string>();
  const [Visiblenofitication, setVisibleNofitication] =
    useState<boolean>(false);

  const PostMaterialCategory = async (valueName: string) => {
    let initalData: MaterialCategory = {
      name: valueName,
      id: '',
    };
    let res = await data.PostMaterialCatergory(initalData);
    if (res === true) {
      setVisibleNofitication(true);
    }
  };
  return (
    <Overlay isVisible={visible}>
      <View style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
        <View style={styles.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            Thêm nhóm nguyên liệu
          </Text>
        </View>
        <View style={[styles.styletxtInput, {marginTop: 28, borderRadius: 4}]}>
          <TextInput
            onChangeText={text => {
              setValueInput(text);
            }}
            style={{padding: 18}}
            placeholder="Tên nhóm nguyên liệu"
          />
        </View>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 35}}>
          <TouchableOpacity
            style={[
              styles.btnExit,
              {alignItems: 'center', alignSelf: 'center', marginRight: 25},
            ]}
            onPress={() => {
              if (valueInput) {
                PostMaterialCategory(valueInput);
              }
            }}>
            <Text style={{color: '#FFFF'}}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnExit,
              {alignItems: 'center', alignSelf: 'center'},
            ]}
            onPress={() => {
              // setvisibleOverplayAddCater(false);
              // setvisibleOverplayAdd(false);
              cancel(false);
            }}>
            <Text style={{color: '#FFFF'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomNotification
        visible={Visiblenofitication}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {
          cancel(false);
          setVisibleNofitication(false);
        }}
        Content="Bạn đã thêm  thành công !"
      />
    </Overlay>
  );
};
export default AddMaterialCategory;
const styles = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 8,
  },
  styletxtInput: {
    borderColor: '#afaeae',
    borderWidth: 0.5,
  },
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
