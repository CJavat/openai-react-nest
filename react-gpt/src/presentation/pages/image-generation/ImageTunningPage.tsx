import { useState } from "react";
import {
  GPTMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GPTMessagesImage,
} from "../../components";
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from "../../../core/use-cases";

interface Message {
  text: string;
  isGPT: boolean;
  info?: {
    imagenUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: "http://localhost:3000/gpt/image-generation/1720482278834.png" as
      | string
      | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariationUseCase(originalImageAndMask.original!);
    setIsLoading(false);

    if (!resp) return;

    //! NO MUESTRA LA IMAGEN
    console.log(resp);

    setMessages((prev) => [
      ...prev,
      {
        text: "Variación",
        isGPT: false,
        info: { alt: resp.alt, imagenUrl: resp.url },
      },
    ]);
  };

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
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img
            className="border rounded-xl w-36 h-36 object-contain"
            src={originalImageAndMask.original}
            alt="Imagen Original"
          />
          <button onClick={handleVariation} className="btn-primary mt-2">
            Generar Variación
          </button>
        </div>
      )}
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
    </>
  );
};
