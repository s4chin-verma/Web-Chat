export const registerValidator = (values: any): { status: boolean; error: string } => {
  const { username, email, password, confirmPassword } = values;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const commonPasswords = ['12345678', 'password', 'qwerty', '111111'];

  if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
    return { status: false, error: 'Please enter Required Field' };
  }

  if (!emailRegex.test(email)) {
    return { status: false, error: 'Please enter a valid email address' };
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
