import ReactNative, { Platform } from 'react-native'

interface Contact {
    name: string;
    phone: Array<string>;
}
interface callFunc { (params: string | object | void): Promise<object> }
function nativeCall(func: callFunc, data?: object): Promise<Contact>{
    const isIOS = Platform.OS === 'ios';
    if (data === undefined) {
        return <Promise<Contact>>func();
    } else {
        const params = isIOS ? JSON.stringify(data) : data;
        return <Promise<Contact>>func(params);
    }
}

const AddressBook = ReactNative.NativeModules.AddressBook;

/**
 * 获取联系人
 * 错误类型 code:E_CONTACT_UNAUTHORIZED; msg:Unauthorized 未授权
 */
export const getContact = () =>nativeCall(AddressBook.getContact);
