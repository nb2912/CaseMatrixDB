import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextProps {
  message: string;
  setMessage: (msg: string) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  message: "",
  setMessage: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
