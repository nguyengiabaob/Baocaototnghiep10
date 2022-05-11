/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalInput from '../Helper/Modal/ModalInput';
import ModalMultipleOption from '../Helper/Modal/ModalOption';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import {Userdata} from '../Model/User';
import {CustomNotification} from '../Model/CustomNofication';
import BellNofi from '../asset/svg/bellnotification.svg';
import RNSmtpMailer from 'react-native-smtp-mailer';
import data from '../services/data';
const CreatAccount: React.FC = () => {
  const [ModalOption, setModalOption] = useState<boolean>(false);
  const [Option, setlOption] = useState<number>(0);
  const [ModalInputVisible, setlModalInput] = useState<boolean>(false);
  const [InputEmail, setlInputEmail] = useState<string>('');
  const [ArrayEmail, setArrayEmail] = useState<string[]>([]);
  const [visibleSucces, setvisibleSucces] = useState<boolean>(false);
  const ArrOption = [
    {
      key: 0,
      nameTitle: 'Tạo tài khoản cho quản lý',
      Action: () => {
        setlOption(0);
      },
    },
    {
      key: 1,
      nameTitle: 'Tạo tài khoản cho nhân viên',
      Action: () => {
        setlOption(1);
      },
    },
  ];
  const ArrInput = [
    {
      placeholder: 'Nhập gmail',
      getValue: (value: any) => setlInputEmail(value),
      CheckAvailable: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    },
  ];
  useEffect(() => {
    setlModalInput(false);
  }, []);
  useEffect(() => {
    if (ModalInputVisible == false && InputEmail !== '') {
      if (ArrayEmail) {
        let check = ArrayEmail.includes(InputEmail);
        console.log('check', check);
        if (!check) {
          ArrayEmail?.push(InputEmail);
          setlInputEmail('');
        }
      } else {
        setArrayEmail(prev => (prev ? prev.concat(InputEmail) : [InputEmail]));
        setlInputEmail('');
      }
    }
  }, [InputEmail, ModalInputVisible, ArrayEmail]);
  useEffect(() => {
    console.log('ArrayEmail', ArrayEmail);
  }, [ArrayEmail]);
  const getAccountName = (email: string) => {
    let index = email.search('@');
    return email.substring(0, index);
  };
  const sendMail = (pass: string, Email: string, username: string) => {
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: 'choigamesss000@gmail.com',
      password: 'nmzx1593tmb',
      fromName: 'choigamesss000@gmail.com', // optional
      replyTo: 'choigamesss000@gmail.com', // optional
      recipients: Email,
      subject: 'Thông báo tài khoản và mật khẩu',
      htmlBody: `Tài khoản của bạn là : ${username}
                /n Mật khẩu của bạn là: ${pass}`,
      // attachmentPaths: [
      //   RNFS.ExternalDirectoryPath + "/image.jpg",
      //   RNFS.DocumentDirectoryPath + "/test.txt",
      //   RNFS.DocumentDirectoryPath + "/test2.csv",
      //   RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
      //   RNFS.DocumentDirectoryPath + "/zipFile.zip",
      //   RNFS.DocumentDirectoryPath + "/image.png"
      // ], // optional
      // attachmentNames: [
      //   "image.jpg",
      //   "firstFile.txt",
      //   "secondFile.csv",
      //   "pdfFile.pdf",
      //   "zipExample.zip",
      //   "pngImage.png"
      // ], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
    })
      .then(success => console.log(success))
      .catch(err => console.log(err));
  };
  const createAccount = () => {
    if (ArrayEmail.length > 0) {
      let intialAccount: Userdata = {
        username: 'none',
        password: 'none',
        type: Option,
        Email: 'none',
        Avatar: 'none',
      };
      Promise.all(
        ArrayEmail.map(i => {
          intialAccount.Email = i;
          intialAccount.username = getAccountName(i);
          intialAccount.password = (
            Math.floor(Math.random() * 99999) + 12345
          ).toString();
          data.postAccountnew(intialAccount).then(res => {
            if (res == true) {
              sendMail(
                intialAccount.password,
                intialAccount.Email,
                intialAccount.username,
              );
            }
          });
        }),
      ).then(() => {
        setArrayEmail([]);
        setvisibleSucces(true);
      });
    }
  };
  return (
    <View>
      <View
        style={[
          styles.Shadowbox,
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: '#02569E',
            height: 50,
          },
        ]}>
        <View style={{justifyContent: 'flex-start', width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              setModalOption(true);
            }}
            style={{marginLeft: 15}}>
            <Ionicons name="options" size={32} color={'#ffff'} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '50%',
            },
          ]}>
          {Option === 0 ? (
            <TouchableOpacity
              onPress={() => {
                setlModalInput(true);
              }}
              style={{marginRight: 25}}>
              <Ionicons name="add-circle" size={32} color={'#ffff'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {}} style={{marginRight: 25}}>
              <Ionicons name="person-add" size={32} color={'#ffff'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{marginTop: 15}}>
        {Option === 0 || Option == 1  ? (
          <ScrollView style={{height: reponsiveheight(560)}}>
            {ArrayEmail.length > 0 ? (
              ArrayEmail.map(i => {
                return (
                  <View style={[styles.Shadowbox, styles.item_List]}>
                    <Text style={{flex: 0.9, marginLeft: 5, fontSize: 18}}>
                      {i}
                    </Text>
                    <View>
                      <MaterialIcons
                        onPress={() => {
                          let a = [...ArrayEmail];
                          let index = a.findIndex(itemArray => itemArray === i);
                          console.log(index);
                          a.splice(index, 1);
                          setArrayEmail(a);
                        }}
                        name="delete"
                        size={32}
                        color={'#FFFF'}
                      />
                    </View>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  height: reponsiveheight(560),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    opacity: 0.3,
                  }}>
                  Danh sách tài khoản chưa có
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <Text>Tạo tài khoản cho nhân viên</Text>
        )}
        {ArrayEmail.length > 0 && (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => createAccount()}
              style={styles.btnExit}>
              <Text style={{color: '#FFFF'}}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalMultipleOption
        visibleModdal={ModalOption}
        HeightModal={250}
        WidthModal={320}
        onExit={setModalOption}
        titleModal="Chọn chế độ"
        arrayOption={ArrOption}
      />
      <ModalInput
        height={200}
        width={330}
        visibleModal={ModalInputVisible}
        title="Nhập thông tin"
        onExit={setlModalInput}
        ArrayField={ArrInput}
        havingEmail={ArrayEmail}
        titleError="Email đã tôn tại hoặc không hợp lệ"
      />
      <CustomNotification
        onCancel={() => setvisibleSucces(false)}
        Content="Tài khoản đã được tạo thành công"
        visible={visibleSucces}
        title="Thông báo"
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Shadowbox: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  item_List: {
    backgroundColor: '#67bff3',
    height: reponsiveheight(60),
    width: reponsivewidth(330),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
export default CreatAccount;
