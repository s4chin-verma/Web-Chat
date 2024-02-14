import jwt from 'jsonwebtoken';

export const signToken = async (userId: string, time: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: time, }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    }
    );
  });
};
