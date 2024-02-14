import { Schema, model, Document } from 'mongoose';

interface ConversationDocument extends Document {
  members: Schema.Types.ObjectId[];
  messages: { authorId: Schema.Types.ObjectId; msg: string; createdAt: Date }[];
}

const conversationSchema = new Schema<ConversationDocument>({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      msg: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const ConversationModel = model<ConversationDocument>('Conversation', conversationSchema);

export default ConversationModel;
