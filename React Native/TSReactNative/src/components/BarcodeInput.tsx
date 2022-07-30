import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { setBarcode } from "../redux/barcodeSlice";

export interface BarcodeInputProps {
  label: string;
  icon: string;
  errorMessage: string;
  text: string;
  onSearchPressed(): void;
}

const BarcodeInput: React.FC<BarcodeInputProps> = ({
  label,
  icon,
  errorMessage,
  text,
  onSearchPressed,
}) => {
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = React.useState(false);
  const [hasError, setError] = React.useState(false);

  return (
    <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
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
          name={icon}
          style={{
            fontSize: 22,
            color: Colors.COLOR_BLUE,
            marginHorizontal: 10,
          }}
        />
        <TextInput
          keyboardType="numeric"
          autoCorrect={false}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(value) => {
            dispatch(setBarcode(value));

            if (value.length > 0 && /^\d+$/.test(value)) {
              setError(false);
            } else {
              setError(true);
            }
          }}
          style={{
            flex: 1,
            color: "#000",
          }}
        />

        <TouchableOpacity disabled={hasError} onPress={onSearchPressed}>
          <Icon
            name="magnify"
            style={{
              fontSize: 22,
              marginHorizontal: 10,
              color: Colors.COLOR_BLUE,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {hasError && (
          <Text
            style={{
              color: Colors.COLOR_RED,
              fontSize: 12,
              marginTop: 7,
            }}
          >
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
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

export default BarcodeInput;
