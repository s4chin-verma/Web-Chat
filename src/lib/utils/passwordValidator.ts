export const passwordValidator = (values: any): { status: boolean; error: string } => {
  const { password, confirmPassword } = values;
  const commonPasswords = ['12345678', 'password', 'qwerty', '111111'];

  if (password.trim() === '' || confirmPassword.trim() === '') {
    return { status: false, error: 'Please Enter Required Field' };
  }

  if (password !== confirmPassword) {
    return { status: false, error: 'Password and Confirm Password should be same' };
  }

  if (password.length < 8) {
    return { status: false, error: 'Password length must be at least 8 characters' };
  }

  if (commonPasswords.some(commonPassword => password.toLowerCase().includes(commonPassword))) {
    return { status: false, error: 'Please choose a stronger password' };
  }

  return { status: true, error: '' };
};
