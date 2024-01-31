import { TextStyle, View } from "react-native";

import { flattenedColors, ColorsKey } from "~constants/theme";

interface ColorProps {
  color?: ColorsKey;
  bg?: ColorsKey;
}

export const withColor = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & ColorProps> => {
  const ComponentWithColor = ({ color, bg, ...props }: P & ColorProps) => {
    const style: TextStyle = {
      color: color ? flattenedColors[color] : "black",
      backgroundColor: bg ? flattenedColors[bg] : "transparent",
    };

    return (
      <View>
        <WrappedComponent
          color={style.color}
          bg={style.backgroundColor}
          {...(props as P)}
        />
      </View>
    );
  };

  ComponentWithColor.displayName = `withColor(${getDisplayName(
    WrappedComponent
  )})`;

  return ComponentWithColor;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
