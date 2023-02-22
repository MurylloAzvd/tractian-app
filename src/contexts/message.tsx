import { createContext, ReactNode, useContext } from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

interface MessageContextValues {
  message: MessageInstance;
}

const MessageContext = createContext<MessageContextValues>(
  {} as MessageContextValues
);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ message: messageApi }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  return context;
};
