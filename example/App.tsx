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
import * as AddressBook from 'react-native-address-book'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';


declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <TouchableHighlight onPress={() => {
          AddressBook.getContact()
            .then((email) => {
              console.log("email is", email);
            })
            .catch((error: { code: any; message: any; }) => {
              console.log("ERROR CODE: ", error.code);
              console.log("ERROR MESSAGE: ", error.message);
            });
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
