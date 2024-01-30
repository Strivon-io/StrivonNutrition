import { MainText } from "~components/atoms/mainText";
import React from "react";
import Markdown from "react-native-markdown-display";

const MarkdownText = ({ children, ...props }) => {
  const rules = {
    text: ({ children }) => <MainText {...props}>{children}</MainText>,
    strong: ({ children }) => (
      <MainText {...props} fontType="bold">
        {children}
      </MainText>
    ),
    em: ({ children }) => (
      <MainText {...props} fontType="bold-italic">
        {children}
      </MainText>
    ),
  };

  return <Markdown rules={rules}>{children}</Markdown>;
};

export default MarkdownText;
