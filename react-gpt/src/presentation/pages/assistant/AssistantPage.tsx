import { useEffect, useState } from "react";
import {
  GPTMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { createThreadUseCase, postQuestion } from "../../../core/use-cases";

interface Message {
  text: string;
  isGPT: boolean;
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>();

  // Obtener el thread y si no existe crearlo
  useEffect(() => {
    const threadIdEffect = localStorage.getItem("threadId");

    if (threadIdEffect) {
      setThreadId(threadIdEffect);
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id);
        localStorage.setItem("threadId", id);
      });
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessages((prev) => [
        ...prev,
        { text: `Número de THREAD: ${threadId}`, isGPT: true },
      ]);
    }
  }, [threadId]);

  const handlePost = async (text: string) => {
    if (!threadId) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGPT: false }]);

    setMessages([]);
    const replies = await postQuestion(threadId, text);
    setIsLoading(false);

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages((prev) => [
          ...prev,
          { text: message, isGPT: reply.role === "assistant", info: reply },
        ]);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessages text="Buen día, soy JavatX. ¿En qué puedo ayudarte?" />

          {messages.map((message, index) =>
            message.isGPT ? (
              <GPTMessages key={index} text={message.text} />
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
