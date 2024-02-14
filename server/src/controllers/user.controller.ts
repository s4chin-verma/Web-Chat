import { Request, Response } from 'express';
import User from '../models/user.model';
import { hashPassword, validatePassword, signToken, createAuthResponse } from '../helper';
import { CustomRequest } from '..//middleware';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, picture } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ status: false, msg: 'Username already taken' });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ status: false, msg: 'Email already taken' });
    }

    const encryptedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
      picture,
    });

    const token = await signToken(user.id, '10d');
    const response = await createAuthResponse(user);

    return res.status(200).json({ status: true, response, token }).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(422).json({ status: false, msg: 'Incorrect username' });
    }

    const validate = await validatePassword(password, user.password);
    if (!validate) return res.status(400).json({ status: false, msg: 'Invalid Password' });

    const token = await signToken(user.id, '10d');

    const response = await createAuthResponse(user);

    return res.status(200).json({ status: true, response, token }).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: 'Error logging in user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).userId;
    const users = await User.find({ _id: { $ne: userId } });

    const simplifiedUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      picture: user.picture,
    }));

    return res.status(200).json(simplifiedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error fetching users' });
  }
};
