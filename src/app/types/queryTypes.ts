export type User = {
  _id: string;
  username: string;
  picture: string;
};

export type Conversation = {
  _id: string | null;
  members: [];
  msg: [];
};
