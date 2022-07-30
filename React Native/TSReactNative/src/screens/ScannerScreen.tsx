import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { mainStyle } from "../constants/Styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import BarcodeScanner from "./BarcodeScannerPage";
import BarcodeScannerScreen from "./BarcodeScannerPage";
import CameraBarcodeScannerPage from "./CameraBarcodePage";
import { Provider } from "react-redux";
import Store from "../redux/store";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProductDetail from "./ProductDetail";

export type RootStackParams = {
  BarcodeScanner: undefined;
  CameraBarcodeScanner: undefined;
  ProductDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function ScannerScreen() {
  return (
    <Provider store={Store}>
      <Stack.Navigator>
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={({ navigation }) => ({
            headerTitle: "Recherche",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CameraBarcodeScanner");
                }}
              >
                <View>
                  <Icon
                    name="camera"
                    style={{
                      fontSize: 22,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CameraBarcodeScanner"
          options={{ headerTitle: "Barcode scanner" }}
          component={CameraBarcodeScannerPage}
        />

        <Stack.Screen
          name="ProductDetail"
          options={{
            headerTitle: "Ajouter un aliment",
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <View>
                  <Icon
                    name="content-save"
                    style={{
                      fontSize: 22,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
          component={ProductDetail}
        />
      </Stack.Navigator>
    </Provider>
  );
}
