import { useState } from "react";
import {
  GPTMessages,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  GPTMessagesAudio,
} from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const disclaimer = `## ¿Qué audio quieres generar hoy?
  * Todo el audio generado es por AI.
`;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
];
interface TextMessage {
  text: string;
  isGPT: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGPT: boolean;
  audio: string;
  type: "audio";
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { text: text, isGPT: false, type: "text" },
    ]);

    //* Use Case
    const { message, ok, audioURL } = await textToAudioUseCase(
      text,
      selectedVoice
    );
    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: `${selectedVoice} - ${message}`,
        isGPT: true,
        type: "audio",
        audio: audioURL!,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessages text={disclaimer} />

          {messages.map((message, index) =>
            message.isGPT ? (
              message.type === "audio" ? (
                <GPTMessagesAudio
                  key={index}
                  text={message.text}
                  audio={message.audio}
                />
              ) : (
                <GPTMessages key={index} text={message.text} />
              )
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        options={voices}
      />
    </div>
  );
};
