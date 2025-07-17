import { useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const fetchChatMessage = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessage = res?.data?.messages.map((msg) => {
        const { senderId, text, updatedAt } = msg;
        return {
          senderId: senderId?._id,
          firstName: senderId?.firstName,
          photoUrl: senderId?.photoUrl,
          text,
          timestamp: new Date(updatedAt),
        };
      });
      setMessages(chatMessage);

      const target = res?.data?.participants.find((p) => p._id !== userId);
      if (target) {
        setTargetUser({
          firstName: target.firstName,
          photoUrl: target.photoUrl,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchChatMessage();
    const socket = createSocketConnection();
    socketRef.current = socket;
    if (!user) {
      return;
    }

    socket.on("connect", () => {});

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("receiveMessage", (messageData) => {
      setMessages((prev) => [
        ...prev,
        { ...messageData, timestamp: new Date(messageData.timestamp) },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      photoUrl: user.photoUrl,
      text: newMessage,
      targetUserId,
    });
    setNewMessage("");
  };

  return (
    <div className="max-w-md mt-5 mx-auto p-4 shadow-lg rounded-lg border border-gray-300 bg-gray-600 h-[500px] flex flex-col">
      {/* Chat Header */}
      <div className="text-lg font-semibold mb-2 border-b pb-2 flex items-center gap-2">
        {targetUser?.photoUrl && (
          <img src={targetUser.photoUrl} className="w-8 h-8 rounded-full" />
        )}
        Chat with {targetUser?.firstName || "User"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3  p-2 bg-gray-500 rounded">
        {messages.map((msj, index) => {
          const isSender = msj.senderId === userId;
          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={msj.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {isSender ? "You" : msj.firstName}
                <time className="text-xs opacity-50">
                  {msj.timestamp.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </time>
              </div>
              <div className="chat-bubble">{msj.text}</div>
              <div className="chat-footer opacity-50">
                {isSender ? "Sent" : "Delivered"}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Section */}
      <div className="mt-2 flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage();
            }
          }}
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
