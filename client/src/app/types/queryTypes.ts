export type User = {
  _id: string;
  username: string;
  picture: string;
  email: string;
};

export type Conversation = {
  _id: string;
  members: string[];
  messages: {
    authorId: string;
    msg: string;
    createdAt: string;
    _id: string;
  }[];
};

export interface AddMessageRequest {
  authorId: string;
  msg: string;
}
