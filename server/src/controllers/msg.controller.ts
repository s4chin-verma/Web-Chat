import { Request, Response } from 'express';
import ConversationModel from '../models/msg.model';
import { isEmpty } from 'lodash';

export const getOrCreateConversation = async (req: Request, res: Response) => {
  try {
    if (isEmpty(req.body)) return res.status(400).json({ msg: 'Request body is empty' });

    const { user1, user2 } = req.body;

    let existingConversation = await ConversationModel.findOne({
      members: { $all: [user1, user2] },
    });

    if (!existingConversation) {
      const newConversation = new ConversationModel({
        members: [user1, user2],
        messages: [],
      });

      existingConversation = await newConversation.save();
    }

    return res.status(200).json({ data: existingConversation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error while getting or creating a conversation' });
  }
};

export const addMessageToConversation = async (req: Request, res: Response) => {
  try {
    if (isEmpty(req.body) || !req.body.authorId || !req.body.msg)
      return res.status(400).json({ msg: 'Invalid request body' });

    const { conversationId } = req.params;
    const { authorId, msg } = req.body;

    const updatedConversation = await ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        $push: {
          messages: { authorId, msg },
        },
      },
      { new: true }
    );

    if (!updatedConversation) return res.status(404).json({ msg: 'Conversation not found' });

    return res.status(200).json({ conversation: updatedConversation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error while adding a message to the conversation' });
  }
};
