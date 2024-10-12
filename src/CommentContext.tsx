import React, { ReactNode, useState, createContext, useContext } from "react";
import { Comments } from "./model/Comments";

interface CommentProviderProps {
  children: ReactNode;
}

interface CommentContextType {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const [comments, setComments] = useState<Comments[]>([]);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
};