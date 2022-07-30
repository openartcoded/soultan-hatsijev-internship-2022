import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

export interface InputProps {
  defaultValue?: string;
  label: string;
  iconName: string;
  errorMessage: string;
  validation: (text: string) => boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  password?: boolean;
  textChanged?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  defaultValue,
  label,
  iconName,
  errorMessage: error,
  validation,
  keyboardType,
  password = false,
  textChanged,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: hasError
              ? Colors.COLOR_RED
              : isFocused
              ? Colors.COLOR_BLUE
              : Colors.COLOR_GRAY,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{
            fontSize: 22,
            color: Colors.COLOR_BLUE,
            marginHorizontal: 10,
          }}
        />
        <TextInput
          keyboardType={keyboardType}
          autoCorrect={false}
          defaultValue={defaultValue}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={(text) => {
            if (validation(text)) {
              setHasError(false);
            } else {
              setHasError(true);
            }

            if (textChanged != undefined) {
              textChanged!(text);
            }
          }}
          style={{
            color: "#000",
            flex: 1,
          }}
        />
      </View>
      {hasError && (
        <Text style={{ color: Colors.COLOR_RED, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    paddingLeft: 7,
    fontSize: 14,
    color: "#D3D3D3",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    paddingHorizontal: 0.5,
    borderWidth: 0.5,
    alignItems: "center",
  },
});

export default Input;
