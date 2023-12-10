export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
export const validateName = (name) => {
    return name?.length && name.match(/^[\w\-\s]+$/);
};

export const validatePhoneNumberUSA = (number) => {
  const PNF = require('google-libphonenumber').PhoneNumberFormat;
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  try {
    number = phoneUtil.parseAndKeepRawInput(number, 'US');

    return phoneUtil.isValidNumberForRegion(number, 'US');
  } catch(e) {
    return false
  }

};
