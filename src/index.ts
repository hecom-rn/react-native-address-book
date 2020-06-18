import ReactNative, { Platform } from 'react-native'

interface Contact {
    name: string;
    phone: Array<string>;
}
interface callFunc { <T>(params: string | object | void): Promise<T> }
function nativeCall<T>(func: callFunc, data?: object): Promise<T>{
    const isIOS = Platform.OS === 'ios';
    if (data === undefined) {
        return func();
    } else {
        const params = isIOS ? JSON.stringify(data) : data;
        return func(params);
    }
}

const AddressBook = ReactNative.NativeModules.AddressBook;

/**
 * 获取联系人
 * 错误类型 code:E_CONTACT_UNAUTHORIZED; msg:Unauthorized 未授权
 */
export const getContact = () =>nativeCall<Contact>(AddressBook.getContact);
