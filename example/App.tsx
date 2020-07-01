/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import * as AddressBook from '@hecom/react-native-address-book'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';
import ReactNative, { Platform ,  PermissionsAndroid,
} from 'react-native'


declare const global: {HermesInternal: null | {}};

const App = () => {

  function _loadContact() {
      AddressBook.getContact()
          .then((contact) => {
              console.log("email is", contact);
          })
          .catch((error: { code: any; message: any; }) => {
              console.log("ERROR CODE: ", error.code);
              console.log("ERROR MESSAGE: ", error.message);
          });

  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <TouchableHighlight onPress={() => {



            const isIOS = Platform.OS === 'ios';
            if (isIOS) {
                _loadContact();
            } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then((data) => {
                    if (data !== 'granted') {
                        console.log('data = ', data);
                    } else {
                        _loadContact();
                    }
                }).catch((err) => {
                    console.log('err = ', err);
                })
            }
        }}>
          <Text style={{ width: 100, height: 100 }}>
            点击
        </Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
