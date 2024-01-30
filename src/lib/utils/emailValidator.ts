export const emailValidator = (email: string): { status: boolean; error: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { status: false, error: 'Please enter a valid email address' };
  }

  return { status: true, error: '' };
};
