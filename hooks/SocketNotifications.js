import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "./use-toast";

const SocketNotifications = ({ user }) => {
  const [socket, setSocket] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/LikeNotification.mp3");
    audio.muted = false;
    audio
      .play()
      .catch((err) => console.error("Error playing notification sound:", err));
  };

  useEffect(() => {
    if (user?.id) {
      const ioSocket = io(`${process.env.NEXT_PUBLIC_API_URL}?id=${user.id}`);
      setSocket(ioSocket);

      ioSocket.on("connect", () => {
        console.log("Connected to server");
      });
      ioSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      ioSocket.on("receiveNotification", (data) => {
        playNotificationSound();
        toast({
          title: "Notification!",
          description: data.message,
          status: "info",
        });
      });

      return () => {
        ioSocket.disconnect();
      };
    }
  }, [user]);

  return (
    <>
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
    </>
  );
};

export default SocketNotifications;
