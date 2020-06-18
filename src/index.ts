import ReactNative, { Platform } from 'react-native'

interface Contact {
    name: string;
    phone: Array<string>;
}
interface callFunc { (params: string | object | void): Promise<object | string> }
function nativeCall(func: callFunc, data?: object, hasCallback = true): Promise<Contact>{
    const isIOS = Platform.OS === 'ios';
    if (data === undefined) {
        if (hasCallback) {
            return isIOS ? func().then(result => JSON.parse(<string>result)) : func();
        } else {
            return <Promise<Contact>>func();
        }
    } else {
        const params = isIOS ? JSON.stringify(data) : data;
        if (hasCallback) {
            return isIOS ? func(params).then(result => JSON.parse(<string>result)) : func(params);
        } else {
            return <Promise<Contact>>func(params);
        }
    }
}

const AddressBook = ReactNative.NativeModules.AddressBook;

/**
 * 获取联系人
 * 错误类型：E_CONTACT_UNAUTHORIZED 未授权
 */
export const getContact = () =>nativeCall(AddressBook.getContact);
