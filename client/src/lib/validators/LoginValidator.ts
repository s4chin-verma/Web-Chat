export const LoginValidator = (values: any): { status: boolean; error: string } => {
  const { username, password } = values;

  if (username === undefined || password === undefined)
    return { status: false, error: 'Required field could not be empty' };

  if (username.trim() === '' || password.trim() === '')
    return { status: false, error: 'Required field could not be empty' };

  return { status: true, error: '' };
};
