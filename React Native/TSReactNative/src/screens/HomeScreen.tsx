import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "../components/CircularProgress";
import Colors from "../constants/Colors";
import { mainStyle } from "../constants/Styles";
import ConsumedProduct from "../models/ConsumedProductModel";
import User from "../models/UserModel";
import {
  selectConsumedProductsModified,
  setConsumedProductsModified,
} from "../redux/consumedProductSlice";
import { selectUser, setUserJson } from "../redux/userSlice";
import { FoodService } from "../services/FoodService";
import UserService from "../services/UserService";

const HomeScreen = () => {
  const userJson = useSelector(selectUser);
  const selectConsumedProductModified = useSelector(
    selectConsumedProductsModified
  );

  const dispatch = useDispatch();

  const userService = new UserService();
  const foodService = new FoodService();

  const [user, setUser] = React.useState<User | undefined>();
  const [consumedProducts, setConsumedProducts] = React.useState<
    ConsumedProduct[]
  >([]);

  const [energy, setEnergy] = React.useState<number>(0);
  const [energyGoal, setEnergyGoal] = React.useState<number>(2000);
  const [carboHydrates, setCarboHydrates] = React.useState<number>(0);
  const [protein, setProtein] = React.useState<number>(0);
  const [fat, setFat] = React.useState<number>(0);

  React.useEffect(() => {
    userService.getUser((result) => {
      if (result != undefined) {
        dispatch(setUserJson(JSON.stringify(result)));
        setUser(JSON.parse(userJson));
      }
    });

    if (consumedProducts.length <= 0 || selectConsumedProductModified == true) {
      loadProducts();
    }

    console.log("daily stats");
    setDailyStatistics();
  }, [userJson, selectConsumedProductModified]);

  const loadProducts = () => {
    foodService.getConsumedProducts((result) => {
      console.log("Loading products in Home Screen");
      setConsumedProducts(result);
      dispatch(setConsumedProductsModified(false));
    });
  };

  const setDailyStatistics = () => {
    const dailyConsumedProducts = consumedProducts.filter((cp) => {
      const consAt = new Date(cp.consumedAt);
      const today = new Date(Date.now());

      console.log(cp.productBarcode);
      console.log(consAt);
      console.log(today);
      console.log();

      return (
        consAt.getFullYear() === today.getFullYear() &&
        consAt.getMonth() === today.getMonth() &&
        consAt.getDate() === today.getDate()
      );
    });

    console.log("Consumed products today :");
    console.log(dailyConsumedProducts);

    setEnergyGoal(user === undefined ? 2400 : user.goal);

    setStatistics(dailyConsumedProducts);
  };

  const setWeeklyStatistics = () => {
    let today = new Date(Date.now());

    const monthlyConsumedProducts = consumedProducts.filter((cp) => {
      const consAt = new Date(cp.consumedAt);

      if (consAt.getFullYear() != today.getFullYear()) {
        return false;
      }

      if (consAt.getMonth() != today.getMonth()) {
        return false;
      }

      const weekStart = new Date(today);

      weekStart.setDate(today.getDate() - consAt.getDay());

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      if (consAt < weekStart || consAt > weekEnd) {
        return false;
      }

      return true;
    });

    console.log("Consumed products monthly");
    console.log(monthlyConsumedProducts);

    setEnergyGoal(user === undefined ? 2400 * 7 : user.goal * 7);

    setStatistics(monthlyConsumedProducts);
  };

  const setMonthlyStatistics = () => {
    const monthlyConsumedProducts = consumedProducts.filter(
      (cp) =>
        new Date(cp.consumedAt).getMonth() === new Date(Date.now()).getMonth()
    );

    console.log("Consumed products monthly");
    console.log(monthlyConsumedProducts);

    setEnergyGoal(user === undefined ? 2400 * 30 : user.goal * 30);

    setStatistics(monthlyConsumedProducts);
  };

  const setStatistics = (consumedProducts: ConsumedProduct[]) => {
    console.log("Making stats");

    let totalQ = 0;
    let en = 0;
    let ch = 0;
    let p = 0;
    let f = 0;

    consumedProducts.forEach((cp, index) => {
      console.log(index + " " + cp.product?.name);

      console.log(cp.quantity + " grammes");
      console.log(cp.productBarcode);
      console.log("kcal: " + cp.product?.energyKCal);
      console.log("glu: " + cp.product?.carboHydrates);
      console.log("prot: " + cp.product?.protein);
      console.log("gra: " + cp.product?.fat);
      console.log("Fin produit : " + index);

      totalQ += cp.quantity;
      en += cp.quantity * (cp.product?.energyKCal! / 100);
      ch += cp.quantity * (cp.product?.carboHydrates! / 100);
      p += cp.quantity * (cp.product?.protein! / 100);
      f += cp.quantity * (cp.product?.fat! / 100);
    });

    console.log(totalQ);
    console.log(en);
    console.log(ch);
    console.log(p);
    console.log(f);

    setEnergy(en);
    setCarboHydrates(ch === 0 ? 0 : (ch / totalQ) * 100);
    setProtein(p === 0 ? 0 : (p / totalQ) * 100);
    setFat((f === 0 ? 0 : f / totalQ) * 100);
  };

  {
    if (user != undefined) {
      return (
        <SafeAreaView style={mainStyle.AndroidSafeArea}>
          <Text
            style={{
              fontSize: 30,
              color: Colors.COLOR_BLUE,
              paddingLeft: 18,
              marginVertical: 15,
            }}
          >
            Bienvenu {user.firstName} {user.lastName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderBottomWidth: 0.2,
              paddingBottom: 4,
            }}
          >
            <Button title="Journalier" onPress={() => setDailyStatistics()} />
            <Button
              title="Hebdomadaire"
              color={Colors.COLOR_DARK_GREEN}
              onPress={() => setWeeklyStatistics()}
            />
            <Button
              title="Mensuel"
              color={Colors.COLOR_LIGHT_GREEN}
              onPress={() => setMonthlyStatistics()}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
              borderBottomWidth: 0.2,
              paddingBottom: 18,
            }}
          >
            <CircularProgress
              actualValue={energy}
              color={Colors.COLOR_DARK_GREEN}
              delay={0}
              duration={500}
              max={energyGoal}
              radius={40}
              strokeWidth={5}
              textColor={Colors.COLOR_BLUE}
            />

            <View
              style={{
                flexShrink: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Apport en énergie</Text>
              <Text textBreakStrategy="simple">
                Objectif : {user.goal} KCal journalière
              </Text>
              <Text>
                Un homme doit consommer de manière journalière entre 2400 et
                2700 kcal
              </Text>
              <Text>
                Une femme doit consommer de manière journalière entre 2000 et
                2200 kcal
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 7,
              borderBottomWidth: 0.2,
              paddingBottom: 18,
            }}
          >
            <CircularProgress
              actualValue={carboHydrates}
              color={"#f52"}
              delay={0}
              duration={500}
              max={100}
              radius={40}
              strokeWidth={5}
              textColor={Colors.COLOR_BLUE}
              fixedDigits={2}
              text={"%"}
            />

            <View
              style={{
                flexShrink: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Glucides</Text>
              <Text>
                Les glucides doivent représenter 45-55% des aliments consommé
                dans une journée
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 7,
              borderBottomWidth: 0.2,
              paddingBottom: 18,
            }}
          >
            <CircularProgress
              actualValue={protein}
              color={"#f5465d"}
              delay={0}
              duration={500}
              max={100}
              radius={40}
              strokeWidth={5}
              textColor={Colors.COLOR_BLUE}
              fixedDigits={2}
              text={"%"}
            />

            <View
              style={{
                flexShrink: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Protéines (Protides)</Text>
              <Text>
                Les glucides doivent représenter 45-55% des aliments consommé
                dans une journée
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 7,
              borderBottomWidth: 0.2,
              paddingBottom: 18,
            }}
          >
            <CircularProgress
              actualValue={fat}
              color={"#a98888"}
              delay={0}
              duration={500}
              max={100}
              radius={40}
              strokeWidth={5}
              textColor={Colors.COLOR_BLUE}
              fixedDigits={2}
              text={"%"}
            />

            <View
              style={{
                flexShrink: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Lipides</Text>
              <Text>
                Les glucides doivent représenter 45-55% des aliments consommé
                dans une journée
              </Text>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Veuillez vous créer un profil avant</Text>
        </View>
      );
    }
  }
};

export default HomeScreen;
