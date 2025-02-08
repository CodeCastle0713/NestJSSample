export enum Message {
  ExistingUser = 'It looks like you’re already registered.',
  SuccessRegister = 'Congratulations! You have successfully registered.',
  InvalidCredential = 'The credentials you entered are incorrect. Please try again.',
  Unauthorized = 'You don’t have authorization yet. Please check your access rights.',
  NoPermission = "You don't have permission to perform this action.",
  NoUser = 'User does not exist',
  RequireUsername = 'Username is required',
  RequireEmail = 'Email is required',
  RequirePassword = 'Password is required',
  InvalidEmailFormat = 'Invalid email format',
  MinPassword = 'Password must be at least 6 characters long',
}
