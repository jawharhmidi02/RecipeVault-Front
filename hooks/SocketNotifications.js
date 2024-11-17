import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "./use-toast";

const SocketNotifications = ({ user, openURL }) => {
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
          action: (
            <button
              className="rounded-lg border-2 border-black bg-transparent px-3 py-2 text-lg font-medium transition-all duration-200 hover:cursor-pointer hover:bg-zinc-100"
              onClick={() => {
                openURL(`/recipes/${data.recipeId}`);
              }}
            >
              Open Recipe
            </button>
          ),
        });
      });

      ioSocket.on("receiveNotificationForAcceptedRecipe", (data) => {
        playNotificationSound();
        toast({
          title: "Notification!",
          description: data.message,
          status: "info",
          action: (
            <button
              className="rounded-lg border-2 border-white bg-transparent px-3 py-2 text-lg font-medium transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-yellow-400"
              onClick={() => {
                openURL(`/recipes/${data.recipeId}`);
              }}
            >
              Open Recipe
            </button>
          ),
        });
      });

      ioSocket.on("receiveNotificationForAcceptedSpecialist", (data) => {
        playNotificationSound();

        let countdown = 5;

        const startCountdown = () => {
          if (countdown > 0) {
            toast({
              id: "notification-toast",
              title: "Notification!",
              description: `${data.message}. Reloading in ${countdown} seconds...`,
              variant: "warning",
              action: (
                <button
                  className="rounded-lg border-2 border-white bg-transparent px-3 py-2 text-lg font-medium transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-yellow-400"
                  onClick={() => {
                    location.href = "/";
                  }}
                >
                  Reload Now!
                </button>
              ),
            });
            countdown--;
            setTimeout(startCountdown, 1300);
          } else {
            location.href = "/";
          }
        };

        startCountdown();
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
