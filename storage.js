import AsyncStorage from '@react-native-async-storage/async-storage';


export const userInfoStorageKey = 'user-info';
export const userNotificationsStorageKey = 'user-notifications';

class AbstractStorageHandler {
  constructor() {
    if(this.constructor == AbstractStorageHandler) {
        throw new Error("This Class is of abstract type and can't be instantiated");
    };
  
    if(this.getStorageKey == undefined) {
      throw new Error("getStorageKey method must be implemented");
    };
  }

  getData = async () => {
    try {
      return await AsyncStorage.getItem(this.getStorageKey());

    } catch (e) {

      return e
    }
  }

  saveData = async (name, email) => {
    try {
      return await AsyncStorage.setItem(this.getStorageKey(), this.stringifyData());
    } catch (e) {

      return e
    }
  }     
  
  parseData(data) {
    return new this.constructor(JSON.parse(data)); 
  }
  
  stringifyData() {
    return JSON.stringify({...this})
  }
}

export class UserInfoStorage extends AbstractStorageHandler {
    constructor(firstName = null, email= null, lastName= null, phoneNumber= null) {
      super()
      this.firstName = firstName;
      this.email = email;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
        
    }

    getStorageKey() {
        return userInfoStorageKey;
    }
}

export class UserNotificationsStorage extends AbstractStorageHandler {
    constructor({hasOrderStatus = false, hasPasswordChange = false, hasSpecialOffers = false, hasNewsletter = false}) {
      super()
      this.hasOrderStatus = hasOrderStatus;
      this.hasPasswordChange = hasPasswordChange;
      this.hasSpecialOffers = hasSpecialOffers;
      this.hasNewsletter = hasNewsletter;
    }

    getStorageKey() {
      return userNotificationsStorageKey;
    }
}