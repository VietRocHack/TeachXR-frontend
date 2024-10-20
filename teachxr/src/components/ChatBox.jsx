import { useEffect, useState } from "react";
import io from "socket.io-client";
import.meta.env.VITE_SOCKET_URL;
import ChatMessage from "../classes/ChatMessage";
import ChatField from "./ChatField";
import ConfirmationBox from "./ConfirmationBox";
// import { IoSend } from 'react-icons/io5'; // Send icon for input

console.log(import.meta.env.VITE_SOCKET_URL);
const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function ChatBox({ messages, setMessages, vapi, connected }) {
  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [isNewMessageLoading, setIsNewMessageLoading] = useState(false);
  useEffect(() => {
    // Listen for 'newData' event from the backend
    socket.on("newData", async (data) => {
      setIsNewMessageLoading(true);
      // Call another API to get additional data
      console.log("New data received:", data);
      try {
        console.log(`${import.meta.env.VITE_SOCKET_URL}/get_latest`);
        const response = await fetch(
          `${import.meta.env.VITE_SOCKET_URL}/get_latest`
        );
        if (response.ok) {
          console.log("Response:", response); // Debugging
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const newMessage = new ChatMessage(true, true, url, data);
          setNewMessage(newMessage);
          setIsNewMessage(true);
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      } finally {
        setIsNewMessageLoading(false);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("newData");
    };
  }, []);

  function setNewBotTextMessage(text) {
    const newMessage = new ChatMessage(false, false, null, text);
    setMessages([...messages, newMessage]);
  }

  function setNewBotImageMessage(url) {
    const newMessage = new ChatMessage(false, true, url, null);
    setMessages([...messages, newMessage]);
  }

  function acceptNewMessage() {
    setMessages([...messages, newMessage]);
    setNewMessage(null);
    console.log(vapi, connected);
    if (vapi && connected) {
      console.log("Sending new message...");
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: `The user might has some question about this. Here is the paragraph: "${newMessage.textMessage}".
                    Just say "I'm ready for your questions about this pargraph"`,
        },
      });
      console.log("Updated message!");
    } else {
      console.log("what da hell");
    }
    setIsNewMessage(false);
  }

  function rejectNewMessage() {
    setNewMessage(null);
    setIsNewMessage(false);
  }

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-gray-900 text-white rounded-lg shadow-lg p-4 overflow-y-scroll">
      {/* Chat History */}
      <div className="flex-grow overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <ChatField
            key={index}
            isFromUser={message.isFromUser}
            url={message.imageSrc}
            text={message.textMessage}
          ></ChatField>
        ))}
      </div>
      {isNewMessage && (
        <ConfirmationBox
          url={newMessage.imageSrc}
          accept={acceptNewMessage}
          reject={rejectNewMessage}
        />
      )}
    </div>
  );
}
