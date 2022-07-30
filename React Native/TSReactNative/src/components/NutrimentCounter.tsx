import React from "react";
import { View, Text } from "react-native";

import Colors from "../constants/Colors";

interface NutrimentCounterProps {
  name: string;
  percentage: number;
  quantity : number;
  color: string;
}

const NutrimentCounter: React.FC<NutrimentCounterProps> = ({
  name,
  percentage,
  quantity,
  color,
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: Colors.COLOR_GRAY,
        }}
      >
        {percentage?.toFixed(2)} %
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: Colors.COLOR_BLUE,
        }}
      >
        {quantity?.toFixed(2)} g
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default NutrimentCounter;
