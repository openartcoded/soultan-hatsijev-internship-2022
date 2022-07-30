import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Alert, Button, SafeAreaView, Text, StyleSheet } from "react-native";
import { mainStyle } from "../constants/Styles";
import { useDispatch, useSelector } from "react-redux";
import { selectBarcode, setBarcode } from "../redux/barcodeSlice";
import { FoodService } from "../services/FoodService";
import { BarcodeScannerPageProps } from "./BarcodeScannerPage";

export interface BarcodeScanned {
  type: string;
  data: string;
}

const CameraBarcodeScannerPage : React.FC<BarcodeScannerPageProps> = (props) => {
  const barcode = useSelector(selectBarcode);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const foodService = new FoodService();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanned) => {
    setScanned(true);

    dispatch(setBarcode(data));
    props.navigation.pop();
  };

  if (hasPermission === null) {
    return <Text>Demande d'accès à la caméra</Text>;
  }

  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <SafeAreaView style={mainStyle.AndroidSafeArea}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, {height:450}]}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
}

export default CameraBarcodeScannerPage;