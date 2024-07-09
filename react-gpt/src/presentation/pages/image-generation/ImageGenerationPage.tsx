import { useState } from "react";
import {
  GPTMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GPTMessagesImage,
} from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGPT: boolean;
  info?: {
    imagenUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGPT: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo)
      return setMessages((prev) => [
        ...prev,
        { text: "No se pudo generar la imagen", isGPT: true },
      ]);

    setMessages((prev) => [
      ...prev,
      {
        text: text,
        isGPT: true,
        info: { imagenUrl: imageInfo.url, alt: imageInfo.alt },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessages text="Hola, ¿Qué imágen deseas generar hoy?" />

          {messages.map((message, index) =>
            message.isGPT ? (
              <GPTMessagesImage
                key={index}
                text={message.text}
                imageUrl={message.info!.imagenUrl}
                alt={message.info!.alt}
              />
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  );
};
