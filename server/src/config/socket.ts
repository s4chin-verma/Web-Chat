import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import UserModel from 'src/models/user.model';

interface OnlineUsersMap {
  [userId: string]: string;
}

export default function setupSocket(server: HttpServer): Server {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  const onlineUsers: OnlineUsersMap = {};

  const getUserIdBySocketId = (socketId: string): string | null => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socketId) {
        return userId;
      }
    }
    return null;
  };

  io.on('connection', socket => {
    socket.on('add-user', (userId: string) => {
      onlineUsers[userId] = socket.id;
      socket.emit('user-online', { name: 'sachin' });
      const onlineUserIds = Object.keys(onlineUsers);
      io.emit('get-users', onlineUserIds);
    });

    socket.on('send-msg', data => {
      const sendUserSocket = onlineUsers[data.to];
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-receive', {
          authorId: data.from,
          msg: data.message,
        });
      }
    });

    socket.on('disconnect', () => {
      const disconnectedUserId = getUserIdBySocketId(socket.id);
      if (disconnectedUserId) {
        delete onlineUsers[disconnectedUserId];
        socket.broadcast.emit('user-offline', disconnectedUserId);
      }
    });
  });

  return io;
}
