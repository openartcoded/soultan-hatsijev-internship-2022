import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BarcodeInput from "../components/BarcodeInput";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import { mainStyle } from "../constants/Styles";
import Product from "../models/ProductModel";
import { selectBarcode } from "../redux/barcodeSlice";
import { FoodService } from "../services/FoodService";
import { RootStackParams } from "./ScannerScreen";

export type BarcodeScannerPageProps = NativeStackScreenProps<
  RootStackParams,
  "BarcodeScanner"
>;

const BarCodeScannerPage: React.FC<BarcodeScannerPageProps> = (props) => {
  const barcode = useSelector(selectBarcode);
  const dispatch = useDispatch();
  const foodService = new FoodService();

  const handleSearch = () => {
    props.navigation.push("ProductDetail");
  };

  return (
    <ScrollView style={mainStyle.AndroidSafeArea}>
      <View></View>
      <View
        style={{
          flex: 1,
        }}
      >
        <BarcodeInput
          errorMessage="message d'erreur"
          icon="barcode"
          label="Code bar"
          text={barcode}
          onSearchPressed={handleSearch}
        />
      </View>
    </ScrollView>
  );
};

export default BarCodeScannerPage;
