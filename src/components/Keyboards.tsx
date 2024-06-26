import React from "react";
import { View, Text, Pressable } from "react-native";
import { keys, ENTER, CLEAR, colors } from "../constants";
import styles, { keyWidth } from "./keyboardStyle";

interface Props {
  onKeyPressed?: (key: string) => void;
  greenCaps?: string[];
  yellowCaps?: string[];
  greyCaps?: string[];
}

const Keyboard: React.FC<Props> = ({
  onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key: string): boolean => {
    return key === ENTER || key === CLEAR;
  };

  const getKeyBGColor = (key: string): string => {
    if (greenCaps.includes(key)) {
      return colors.primary;
    }
    if (yellowCaps.includes(key)) {
      return colors.secondary;
    }
    if (greyCaps.includes(key)) {
      return colors.darkgrey;
    }
    return colors.grey;
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              disabled={greyCaps.includes(key)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
