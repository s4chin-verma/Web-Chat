import userModel from '../models/user.model';
import { Request, Response } from 'express';
import { signToken, sendEmail, hashPassword } from '../helper';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: 'User with the provided email not found.' });

    const token = await signToken(user._id, '1h');
    await sendEmail(email, user._id, token);

    res.status(200).json({ status: true, msg: 'Password reset link sent to your email account' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Error while sending password reset email.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { password } = req.body;
    console.log('request come');
    const encryptedPass = await hashPassword(password);

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { password: encryptedPass });

    if (!user) {
      return res.status(404).json({ status: false, msg: 'User not found.' });
    }

    return res
      .status(200)
      .json({ status: true, msg: 'Password reset successfully. Please login with new password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: 'Cannot change the password.' });
  }
};
