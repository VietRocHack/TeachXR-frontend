import { useEffect, useState } from "react";

import Vapi from "@vapi-ai/web";
import { VAPI_KEY } from "../utils";
import CenterButton from "./CenterButton";

const ChatBot = ({ isMuted }) => {
  // save previous questions-answer
  const [vapi, setVapi] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // hook into Vapi events
  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_KEY);
    setVapi(vapiInstance);

    // vapiInstance.setMuted(!isMuted)

    console.log("starting hooks");
    vapiInstance.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
    });

    vapiInstance.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    // vapiInstance.on("speech-start", () => {
    //   setAssistantIsSpeaking(true);
    // });

    // vapiInstance.on("speech-end", () => {
    //   setAssistantIsSpeaking(false);
    // });

    // vapiInstance.on("volume-level", (level) => {
    //   setVolumeLevel(level);
    // });

    vapiInstance.on("message", (message) => {
      console.log("Message received:");
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newEntry = {
          timestamp: message.timestamp,
          role: message.role,
          text: message.transcript,
        };
        setChatHistory((prev) => {
          const updatedTranscripts = [...prev, newEntry];
          // console.log('Updated transcripts:', updatedTranscripts);
          return updatedTranscripts;
        });
      }
    });

    vapiInstance.on("error", (error) => {
      console.error(error);

      setConnecting(false);
      // if (isPublicKeyMissingError({ vapiError: error })) {
      //   setShowPublicKeyInvalidMessage(true);
      // }
    });
    return () => {
      console.log("cleanup");
      vapiInstance.stop();
    };
  }, []);

  useEffect(() => {
    // Function to update the state
    const updateMessage = () => {
      // Replace this with the logic to get the new message
      if (vapi && connected) {
        console.log("Sending new message...");
        vapi.send({
          type: "add-message",
          message: {
            role: "system",
            content: `The user might has some question about this. Here is the paragraph: "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.

Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched to the skin and splattered with mud." Just say "I'm ready for your questions about this pargraph"`,
          },
        });
        console.log("Updated message!");
      } else {
        console.log("what da hell");
      }
    };

    // Set up the interval to update every 10 seconds (10000 ms)
    const intervalId = setInterval(updateMessage, 10000);
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [vapi, connected]);

  const assistantOptions = {
    name: "Teach XR",
    firstMessage:
      "Hi, this is Teach XR. Let me know if you have any questions while you're reading!",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      // provider: "groq",
      // model: "llama-3.1-70b-versatile",
      provider: "openai",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You’re a teacher who helps readers understand concepts, gives more context, or uses simple analogies to make things clearer for your students reading a book.
  
  Most of the time, students will share a paragraph or a few pages from the book. Your job is to explain a specific part, summarize the whole thing, provide an analogy, or use any other method that helps them grasp the material better.
  
  It’s important to keep the context of previous questions in mind so you can connect different parts of the book and deliver a smooth, cohesive answer.
  
  Use casual language—phrases like "Umm...", "Well...", or "I mean" are great. Adding some humor or a light-hearted tone would also be appreciated.`,
        },
      ],
    },
  };

  const startCallInline = () => {
    setConnecting(true);
    vapi.start(assistantOptions);
    // vapi.start('4b6c564d-7931-4227-b2f3-cbafd3c263c1')   //from the website
  };

  return (
    <>
      <CenterButton
        label="Call TeachXR"
        onClick={startCallInline}
        // isLoading={connecting}
      />
      {/* <div>
        {chatHistory.length > 0
          ? chatHistory.map((entry, index) => (
              <div key={index}>
                <strong>{entry.timestamp}</strong> [{entry.role}]: {entry.text}
              </div>
            ))
          : "No transcript available"}
      </div> */}
    </>
  );
};

export default ChatBot;