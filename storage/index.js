import AsyncStorage from '@react-native-async-storage/async-storage';

export const userInfoStorageKey = 'user-info';

export class UserInfoStorage {
    constructor(
      {
        firstName = null,
        email = null,
        lastName = null,
        phoneNumber= null,
        imageURI=null,
        hasOrderStatus = false,
        hasPasswordChange = false,
        hasSpecialOffers = false,
        hasNewsletter = false
      } = {}
    ) {
      this.data = {
        firstName,
        email,
        lastName,
        phoneNumber,
        imageURI,
        hasOrderStatus,
        hasPasswordChange,
        hasSpecialOffers,
        hasNewsletter,
      }
      this.storageKey = userInfoStorageKey
    }

    getData = async () => {
      try {
        const value =  await AsyncStorage.getItem(this.storageKey);
        return JSON.parse(value)
  
      } catch (e) {
        console.log(e, 'getData error')
        return e
      }
    }
  
    saveData = async () => {
      try {
        return await AsyncStorage.setItem(this.storageKey, this.stringifyData());
      } catch (e) {
        console.log(e, 'saveData error')
        return e
      }
    }

    removeData = async () => {
      try {
        const value = await AsyncStorage.removeItem(this.storageKey);
        return true;
      } catch (e) {
        console.log(e, 'removeData error')
        return e
      }
    }
    
    parseData(data) {
      return new this.constructor(JSON.parse(data)); 
    }
    
    stringifyData() {
      return JSON.stringify({...this.data})
    }
}
