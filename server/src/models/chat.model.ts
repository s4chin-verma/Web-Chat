import mongoose, { Schema, Document } from 'mongoose';

interface ChatModel extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage: mongoose.Types.ObjectId;
  groupAdmin?: mongoose.Types.ObjectId;
}

const ChatSchema: Schema<ChatModel> = new Schema<ChatModel>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model<ChatModel>('Chat', ChatSchema);

export default ChatModel;
