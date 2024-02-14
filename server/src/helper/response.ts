export const createAuthResponse = (user: any) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    picture: user.picture,
  };
};

export const createMemberListResponse = (user: any) => {
  return {
    _id: user._id,
    username: user.username,
    pic: user.pic,
    isOnline: user.isOnline,
  };
};
