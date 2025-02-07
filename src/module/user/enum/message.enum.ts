export enum Message {
  ExistingUser = 'It looks like the user is already exist',
  NoUser = 'The user does not exist',
  SuccessUpdate = 'The user successfully updated!',
  SuccessDelete = 'The user successfully deleted!',
  SuccessCreate = 'The user successfully created!',

  RequireUsername = 'Username is required',
  RequireEmail = 'Email is required',
  RequirePassword = 'Password is required',
  InvalidEmailFormat = 'Invalid email format',
  MinPassword = 'Password must be at least 6 characters long',
}
