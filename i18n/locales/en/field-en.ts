export default {
  // see https://github.com/jquense/yup/blob/d00abc331801388cb572a07094ba0cb803a50d5d/src/locale.ts
  validation: {
    required: '{field} is required',
    email: 'invalid {field}',
    min: '{field} must be at least {min} characters',
    max: '{field} must be at most {max} characters',
    confirmPassword: 'Password doesn\'t match',
    username: '{username} is taken. Please try with another username',
  },
  field: {
    fullName: {
      label: 'Name',
      placeholder: 'enter first name',
      description: 'Your full name that displayed in your profile'
    },
    firstName: {
      label: 'First Name',
      placeholder: 'enter first name',
      description: 'Your first name that is displayed in your profile'
    },
    middleName: {
      label: 'Middle Name',
      placeholder: 'enter your middle name',
      description: 'Your middle name that is displayed in your profile'
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'enter last name',
      description: 'Your last name that is displayed in your profile'
    },
    email: {
      label: 'Email Address',
      placeholder: 'enter email address',
      description: 'Your email address for communication'
    },
    password: {
      label: 'Password',
      placeholder: 'enter a password',
      description: 'Your password'
    },
    oldPassword: {
      label: 'Current password',
      placeholder: 'enter the current password',
      description: 'Your current password'
    },
    newPassword: {
      label: 'New password',
      placeholder: 'enter a new password',
      description: 'Your new password'
    },
    newPasswordConfirm: {
      label: 'Confirm new password',
      placeholder: 'confirm new password',
      description: 'You should enter the same new password again'
    },
    confirmPassword: {
      label: 'Confirm password',
      placeholder: 'confirm password',
      description: 'You should enter the same password again'
    },
    country: {
      label: 'Country',
      placeholder: 'enter country',
      description: 'Your country that is displayed in your profile'
    },
    username: {
      label: 'Username',
      placeholder: 'enter a username',
      description: 'Your username in your profile url'
    },
    about: {
      label: 'About',
      placeholder: 'tell something about you',
      description: 'About you'
    },
  },
}
