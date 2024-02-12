import Markdown from "react-native-markdown-display";
import { FC } from "react";

import { Text } from "~components/atoms/text";

const MarkdownText: FC<{ children: JSX.Element }> = ({
  children,
  ...props
}) => {
  const rules = {
    text: ({ children }) => <Text {...props}>{children}</Text>,
    strong: ({ children }) => (
      <Text {...props} fontFamily="Avenir-Bold">
        {children}
      </Text>
    ),
    em: ({ children }) => (
      <Text {...props} fontFamily="Avenir-Bold-Italic">
        {children}
      </Text>
    ),
  };

  return <Markdown rules={rules}>{children}</Markdown>;
};

export default MarkdownText;
