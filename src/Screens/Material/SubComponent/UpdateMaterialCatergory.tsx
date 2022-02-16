/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {CustomNotification} from '../../../Model/CustomNofication';
import {MaterialCategory} from '../../../Model/MaterialCategory';
import data from '../../../services/data';
import DataService from '../../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
import BellNofi from '../../../asset/svg/bellnotification.svg';
type props = {
  title: string;
  visible: boolean;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  onExit: (value: any) => void;
};
const UpdateMaterialCategory: React.FC<props> = ({
  title,
  visible,
  viewStyle,
  textStyle,
  onExit,
}) => {
  const [data2, setData2] = useState<MaterialCategory[]>([]);
  const [visible2, setvisible2] = useState<boolean>(false);
  const [visibleId, setvisibleId] = useState<string>('');
  const getDataMaterialCategory = async () => {
    let data: MaterialCategory[] =
      await DataService.Getdata_dtService<MaterialCategory>(
        'MaterialCatergory',
      );
    console.log('456789', data);
    setData2(data);
  };
  useEffect(() => {
    getDataMaterialCategory();
  }, [visible2]);
  type props2 = {
    id: string;
    visible: boolean;
    cancel: (value: any) => void;
  };
  const EditMaterialCategory: React.FC<props2> = ({id, visible, cancel}) => {
    const [valueInput, setValueInput] = useState<string>();
    const [Visiblenofitication, setVisibleNofitication] =
      useState<boolean>(false);

    const getDataMaterialCategoryById = async (id: string) => {
      let data1: MaterialCategory =
        await DataService.Getdata_dtServiceById<MaterialCategory>(
          'MaterialCatergory',
          id,
        );
      setValueInput(data1.Name);
    };
    useEffect(() => {
      getDataMaterialCategoryById(id);
    }, [id]);
    return (
      <Overlay isVisible={visible}>
        <View
          style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
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
          <View
            style={[styles.styletxtInput, {marginTop: 28, borderRadius: 4}]}>
            <TextInput
              onChangeText={text => {
                setValueInput(text);
              }}
              style={{padding: 18}}
              placeholder="Tên nhóm nguyên liệu">
              {valueInput}
            </TextInput>
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
                  let initalvalue: MaterialCategory = {
                    id: id,
                    Name: valueInput,
                  };
                  data.updateMaterialCatergory(initalvalue).then(res => {
                    if (res === true) {
                      setVisibleNofitication(true);
                    }
                  });
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
            setVisibleNofitication(false);
            setvisible2(false);
          }}
          Content="Bạn đã cập nhật thành công !"
        />
      </Overlay>
    );
  };
  return (
    <Overlay isVisible={visible}>
      <View style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
        <View style={styles.TitleOverlAdd}>
          <Text style={styles.style_title}>{title}</Text>
        </View>
        <ScrollView>
          {data2.map(item => {
            return (
              <>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setvisible2(true);
                    setvisibleId(item.id);
                  }}
                  style={[
                    styles.btnChoosenAdd,
                    viewStyle,
                    {marginVertical: 10, padding: 15},
                  ]}>
                  <Text style={textStyle}>{item.Name}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>
      </View>
      <EditMaterialCategory
        visible={visible2}
        id={visibleId}
        cancel={setvisible2}
      />
      <TouchableOpacity
        style={[styles.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
        onPress={() => onExit(false)}>
        <Text style={{color: '#FFFF'}}>Thoát</Text>
      </TouchableOpacity>
    </Overlay>
  );
};
export default UpdateMaterialCategory;
const styles = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  style_title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000000',
    paddingBottom: 2,
    fontWeight: '700',
  },
  btnChoosenAdd: {
    alignItems: 'center',
    borderBottomColor: '#afaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#afaeae',
    borderTopWidth: 0.5,
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
