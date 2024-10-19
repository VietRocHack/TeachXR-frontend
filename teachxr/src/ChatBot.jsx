// import React, { useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa'; // For the bot avatar icon
// import { IoSend } from 'react-icons/io5'; // Send icon for input

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     { text: 'Hello! How can I assist you today?', sender: 'bot' },
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim() === '') return;

//     const userMessage = { text: input, sender: 'user' };
//     setMessages([...messages, userMessage]);
//     setInput(''); // Clear input after sending

//     // Simulate bot response
//     setTimeout(() => {
//       const botMessage = { text: 'This is a bot response.', sender: 'bot' };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     }, 1000);
//   };

//   return (
//     <div className="w-full h-full flex flex-col justify-between bg-gray-900 text-white rounded-lg shadow-lg p-4">
//       {/* Chat History */}
//       <div className="flex-grow overflow-y-auto p-3 space-y-4">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex items-start ${
//               message.sender === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             {message.sender === 'bot' && (
//               <FaUserCircle className="text-3xl text-blue-400 mr-3" />
//             )}
//             <div
//               className={`max-w-xs p-3 rounded-lg ${
//                 message.sender === 'user'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-800 text-gray-200'
//               }`}
//             >
//               {message.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="flex items-center border-t border-gray-700 pt-3">
//         <input
//           type="text"
//           className="w-full bg-gray-800 text-white p-2 rounded-lg mr-2"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button
//           className="text-blue-500 hover:text-blue-400"
//           onClick={handleSend}
//         >
//           <IoSend size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
