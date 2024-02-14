import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

// Function to hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex'); // Generate a random salt
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); // Hash the password
  return `${salt}:${hash}`; // Combine salt and hash and return
}

// Function to validate password
export async function validatePassword(
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const [salt, hash] = hashedPassword.split(':'); // Extract salt and hash from the stored hashed password
  const newHash = pbkdf2Sync(enteredPassword, salt, 1000, 64, 'sha512').toString('hex'); // Hash the entered password with the same salt
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(newHash, 'hex')); // Compare the hashes in constant time
}
