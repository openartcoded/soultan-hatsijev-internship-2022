import React, { JSXElementConstructor, ReactElement } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { onClose, onOpen, Picker } from "react-native-actions-sheet-picker";
import Colors from "../constants/Colors";

export interface MealPickerProps {
  selected: string | undefined;
  mealTypes: string[];
  setSelected: (value: string) => void;
}

const MealPicker: React.FC<MealPickerProps> = ({
  selected = "something",
  mealTypes,
  setSelected,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.2,
        paddingVertical: 12,
      }}
    >
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Repas
      </Text>
      <TouchableOpacity
        onPress={() => {
          onOpen("meal");
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.COLOR_BLUE,
          }}
        >
          {selected}
        </Text>
      </TouchableOpacity>

      <Picker<string>
        id="meal"
        data={mealTypes}
        searchable={false}
        label="Sélectionnez un repas"
        setSelected={setSelected}
        renderListItem={function (
          item: string
        ): ReactElement<any, string | JSXElementConstructor<any>> {
          return (
            <TouchableOpacity
              style={{
                marginVertical: 10,
                borderBottomWidth: 0.5,
              }}
              onPress={() => {
                setSelected(item);
                onClose("meal");
              }}
            >
              <Text
                style={{
                  margin: 2,
                  fontSize: 18,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MealPicker;
