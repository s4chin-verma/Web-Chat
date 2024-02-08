export type NavLinkType = {
  name: string;
  url: string;
};

export type Message = {
  _id: string;
  authorId: string;
  msg: string;
};

export type User = {
  _id: string;
  username: string;
  picture: string;
};
