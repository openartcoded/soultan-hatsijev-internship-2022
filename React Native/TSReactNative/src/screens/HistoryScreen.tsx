import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mainStyle } from "../constants/Styles";
import ConsumedProduct from "../models/ConsumedProductModel";
import {
  selectConsumedProductsModified,
  setConsumedProductsModified,
} from "../redux/consumedProductSlice";
import { FoodService } from "../services/FoodService";

const HomeScreen = () => {
  const selectConsumedProductModified = useSelector(
    selectConsumedProductsModified
  );
  const dispatch = useDispatch();
  const foodService = new FoodService();
  const [consumedProducts, setConsumedProducts] = React.useState<
    ConsumedProduct[]
  >([]);

  React.useEffect(() => {
    handleProductLoading();

    if (consumedProducts.length > 0) {
      console.log("Consumed products list isn't empty. Reloading the list");
      if (selectConsumedProductModified) {
        console.log("Reload start");
        handleProductLoading();
      }
    }
  }, [selectConsumedProductModified]);

  const handleProductLoading = async () => {
    foodService.getConsumedProducts((result) => {
      console.log("Products loaded");
      console.log(result);
      setConsumedProducts(result);
      dispatch(setConsumedProductsModified(false));
    });
  };

  {
    if (consumedProducts.length > 0) {
      return (
        <ScrollView style={mainStyle.AndroidSafeArea}>
          {consumedProducts.map((prop, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  alert(
                    "Rien pour l'instant. Le clique doit rediriger vers la page product details"
                  );
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: 5,
                  }}
                >
                  <Image
                    source={{ uri: prop.product?.imgSmallUrl }}
                    style={{
                      width: 80,
                      height: 100,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "column",
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        padding: 2,
                      }}
                    >
                      {prop.product?.name}
                    </Text>
                    <Text>Quantité consommé: {prop.quantity} grammes</Text>
                    <Text>
                      Quantité KCal:{" "}
                      {(
                        (prop?.product!.energyKCal / 100) *
                        prop.quantity
                      ).toFixed(2)}
                    </Text>
                    <Text>
                      Consommé le{" "}
                      {new Date(prop.consumedAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Il n'y a aucun produit consommé dans l'historique</Text>
        </View>
      );
    }
  }
};

export default HomeScreen;
