import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React, { JSXElementConstructor, ReactElement } from "react";
import { BarcodeScannerPageProps } from "./BarcodeScannerPage";
import { useDispatch, useSelector } from "react-redux";
import { selectBarcode } from "../redux/barcodeSlice";
import Colors from "../constants/Colors";
import Product from "../models/ProductModel";
import MealPicker from "../components/MealPicker";
import { FoodService } from "../services/FoodService";
import CircularProgress from "../components/CircularProgress";
import { PrivateValueStore } from "@react-navigation/native";
import NutrimentCounter from "../components/NutrimentCounter";
import ConsumedProduct from "../models/ConsumedProductModel";
import { setConsumedProductsModified } from "../redux/consumedProductSlice";
import { selectUser } from "../redux/userSlice";

const ProductDetailPage: React.FC<BarcodeScannerPageProps> = (props) => {
  const dispatch = useDispatch();
  const barcode = useSelector(selectBarcode);
  const userJson = useSelector(selectUser);

  const foodService = new FoodService();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selected, setSelected] = React.useState<string | undefined>();
  const [carboHydrates, setCarboHydrates] = React.useState<number>();
  const [fat, setFat] = React.useState<number>();
  const [protein, setProtein] = React.useState<number>();
  const [energyKCal, setEnergyKCal] = React.useState<number>();
  const [quantity, setQuantity] = React.useState<number>(100);

  const mealTypes = ["Petit-déjeuner", "Déjeuner", "Dîner", "Snacks"];

  React.useEffect(() => {
    const fetchProduct = async () => {
      const product = await foodService.getProduct(barcode);

      setProduct(product);

      setCarboHydrates(product?.carboHydrates!);
      setProtein(product?.protein!);
      setFat(product?.fat!);
      setEnergyKCal(product?.energyKCal!);
    };
    setSelected(mealTypes[0]);

    fetchProduct().catch(console.error);
  }, [userJson]);

  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      <MealPicker
        selected={selected}
        setSelected={setSelected}
        mealTypes={mealTypes}
      />
      <Text
        style={{
          fontSize: 22,
          color: Colors.COLOR_BLUE,
          paddingLeft: 10,
          paddingBottom: 18,
          marginVertical: 14,
          borderBottomWidth: 0.2,
        }}
      >
        {product?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 10,
          borderBottomWidth: 0.2,
          paddingBottom: 18,
        }}
      >
        <CircularProgress
          actualValue={energyKCal ?? 0}
          radius={40}
          strokeWidth={5}
          duration={500}
          color={Colors.COLOR_DARK_GREEN}
          delay={0}
          textColor={Colors.COLOR_BLUE}
          max={userJson === undefined ? 10000 : JSON.parse(userJson).goal}
        />
        <NutrimentCounter
          name="Glucides"
          color={"#f52"}
          percentage={product?.carboHydrates!}
          quantity={carboHydrates ?? 0}
        />
        <NutrimentCounter
          name="Protides"
          color={"#f5465d"}
          percentage={product?.protein!}
          quantity={protein ?? 0}
        />
        <NutrimentCounter
          name="Lipides"
          color={"#a98888"}
          percentage={product?.fat!}
          quantity={fat ?? 0}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.2,
          paddingVertical: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Quantité
        </Text>

        <TextInput
          keyboardType="number-pad"
          defaultValue={quantity.toFixed(2)}
          style={{
            borderBottomWidth: 0.2,
            padding: 0.5,
            color: "#000",
            flex: 1,
            marginHorizontal: 10,
            fontSize: 18,
          }}
          onChangeText={(text) => {
            if (!Number.isNaN(text)) {
              let quantity: number = Number.parseFloat(text);
              setCarboHydrates((product?.carboHydrates! / 100) * quantity);
              setFat((product?.fat! / 100) * quantity);
              setProtein((product?.protein! / 100) * quantity);
              setEnergyKCal((product?.energyKCal! / 100) * quantity);
              setQuantity(quantity);
            }
          }}
        />
        <Text style={{ fontSize: 18 }}>Grammes</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Button
          title="Ajouter"
          onPress={() => {
            let consumedProduct = new ConsumedProduct(
              quantity,
              selected!,
              product?.barcode!,
              Date.now()
            );

            foodService.saveProduct(consumedProduct, (result) => {
              if (result > 0) {
                console.log("Product save on button press");
                dispatch(setConsumedProductsModified(true));
                props.navigation.pop();
              } else {
                console.log("product not saved on button press");
              }
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({});
