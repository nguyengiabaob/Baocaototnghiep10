/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import CustomHeaderScreen from '../../Model/CustomeHeaderScreen';
import {CustomNotification} from '../../Model/CustomNofication';
import data from '../../services/data';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import storage from '@react-native-firebase/storage';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import AddConfigMaterial from './AddConfigMaterial';
import Loading from '../../Helper/Loader/Loading';
type props = {
  visible: boolean;
  OnExit: (val: any) => void;
  UpdateConfig?: any;
};
const ChoosenConfigMaterial: React.FC<props> = ({
  visible,
  OnExit,
  UpdateConfig,
}) => {
  const [GetItemMaterial, setGetItemMaterial] = useState<any[]>([]);
  const [TextTitle, setTextTitle] = useState<string>('');
  const [visibleSucces, setVisibleSuccess] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const DelImage = (url: string) => {
    const imgref = storage().refFromURL(url);
    imgref
      .delete()
      .then(() => {
        console.log('del Success');
      })
      .catch(e => console.log(e));
  };
  const saveMaterial = () => {
    let array = [...GetItemMaterial];
    setLoading(true);
    Promise.all(
      array.map(async x => {
        if (x.filename) {
          const reference = storage().ref(x.filename);
          console.log(reference);
          const pathToFile = x.pathimg;
          await reference.putFile(pathToFile);
          let urlimg = await reference.getDownloadURL();
          x.Img = urlimg;
        }
      }),
    ).then(res => {
      let newdata = {
        title: TextTitle,
        ListMaterial: [...array],
      };
      if (TextTitle === '') {
        setLoading(false);
        setVisibleError(true);
      } else {
        data.PostConfigMaterial(newdata).then(response => {
          if (response === true) {
            setLoading(false);
            setVisibleSuccess(true);
          }
        });
      }
    });
  };
  const updateMaterial = () => {
    let array = [...GetItemMaterial];
    setLoading(true);
    Promise.all(
      array.map(async x => {
        if (x.Img !== 'none') {
          DelImage(x.Img);
        }
        if (x.filename) {
          const reference = storage().ref(x.filename);
          console.log(reference);
          const pathToFile = x.pathimg;
          await reference.putFile(pathToFile);
          let urlimg = await reference.getDownloadURL();
          x.Img = urlimg;
        }
      }),
    ).then(res => {
      let newdata = {
        title: TextTitle,
        ListMaterial: [...array],
      };
      if (TextTitle === '') {
        setLoading(false);
        setVisibleError(true);
      } else {
        data.PutConfigMaterial(newdata, UpdateConfig.id).then(response => {
          if (response === true) {
            setLoading(false);
            setVisibleSuccess(true);
          }
        });
      }
    });
  };
  useEffect(() => {
    if (UpdateConfig) {
      setTextTitle(UpdateConfig.title);
    }
  }, [UpdateConfig]);
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView
        style={{
          width: getwidth(),
          height: getheight(),
          flex: 1,
          marginTop: -10.5,
        }}>
        <CustomHeaderScreen
          title={UpdateConfig ? 'Cập nhật nguyên liệu' : 'Thêm nguyên liệu'}
          onCancel={OnExit}
        />
        <View
          style={[
            {
              marginBottom: 8,
              alignItems: 'center',
              marginTop: 8,
              height: '18%',
              justifyContent: 'center',
            },
          ]}>
          <TextInput
            defaultValue={TextTitle}
            onChange={e => {
              setTextTitle(e.nativeEvent.text);
            }}
            style={{
              width: reponsivewidth(320),
              borderWidth: 0.8,
              borderRadius: 5,
            }}
            placeholder="Tên tiều đề nguyên liệu"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 15,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#02569E'}} />
          <View style={{width: '25%'}}>
            <Text style={{textAlign: 'center'}}>Nguyên liệu</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#02569E'}} />
        </View>
        <ScrollView style={{height: '57%'}}>
          {UpdateConfig ? (
            <AddConfigMaterial
              getArrayItem={setGetItemMaterial}
              ConfigDetail={UpdateConfig.ListMaterial}
            />
          ) : (
            <AddConfigMaterial getArrayItem={setGetItemMaterial} />
          )}
        </ScrollView>
        <View style={{alignItems: 'center', height: '10%'}}>
          <TouchableOpacity
            onPress={() => {
              UpdateConfig ? updateMaterial() : saveMaterial();
            }}
            style={styles.btn_add}>
            <Text style={styles.titleadd}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <CustomNotification
        onCancel={() => {
          setVisibleSuccess(false);
          OnExit(false);
        }}
        visible={visibleSucces}
        title={'Thông báo'}
        Content={
          UpdateConfig
            ? 'Cấu hình nguyên liệu đã được cập nhật'
            : 'Cấu hình nguyên liệu đã được thêm'
        }
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
      <CustomNotification
        onCancel={() => {
          setVisibleError(false);
        }}
        visible={visibleError}
        title={'Thông báo'}
        Content={'Tiêu đề không được để trống'}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
      <Loading visible={loading} />
    </Overlay>
  );
};
export default ChoosenConfigMaterial;
const styles = StyleSheet.create({
  driver: {
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  btn_add: {
    alignItems: 'center',
    backgroundColor: '#02569E',
    width: reponsivewidth(150),
    borderRadius: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleadd: {
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
});
