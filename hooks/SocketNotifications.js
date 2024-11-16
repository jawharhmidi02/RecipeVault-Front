import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketNotifications = ({ user }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user?.id) {
      const ioSocket = io(`${process.env.NEXT_PUBLIC_API_URL}?id=${user.id}`);
      setSocket(ioSocket);

      return () => {
        ioSocket.disconnect();
      };
    }
  }, [user]);

  return <></>;
};

export default SocketNotifications;
