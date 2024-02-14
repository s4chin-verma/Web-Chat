import { extend } from 'lodash';
import mongoose, { Document, Schema, model } from 'mongoose';

interface UserModel extends Document {
  username: string;
  email: string;
  password: string;
  picture: string;
  isOnline?: boolean;
}

const userSchema: Schema<UserModel> = new Schema<UserModel>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  picture: {
    type: String,
    required: true,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },

  isOnline: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model<UserModel>('User', userSchema);
export default UserModel;
