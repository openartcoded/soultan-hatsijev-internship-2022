import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import { mainStyle } from "../constants/Styles";
import User from "../models/UserModel";
import { selectUser, setUserJson } from "../redux/userSlice";
import UserService from "../services/UserService";

export default function ProfileScreen() {
  const userJson = useSelector(selectUser);
  const dispatch = useDispatch();

  const userService: UserService = new UserService();

  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [goal, setGoal] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isCreated, setIsCreated] = React.useState<boolean>(false);

  React.useEffect(() => {
    const parsedUser: User | undefined = JSON.parse(userJson);

    setFirstName(parsedUser === undefined ? "" : parsedUser.firstName);
    setLastName(parsedUser === undefined ? "" : parsedUser.lastName);
    setGoal(parsedUser === undefined ? 0 : parsedUser.goal);
  }, [userJson]);

  return (
    <>
      <SafeAreaView style={[mainStyle.container, mainStyle.AndroidSafeArea]}>
        <Input
          defaultValue={firstName}
          iconName="account"
          label="Prénom"
          errorMessage="Veuillez saisir votre prénom!"
          validation={(text: string) => {
            return text.trim().length >= 2 && text.length <= 50;
          }}
          textChanged={(text) => {
            setFirstName(text);
          }}
        />
        <Input
          defaultValue={lastName}
          iconName="account"
          label="Nom"
          errorMessage="Veuillez votre nom de famille!"
          validation={(text) => {
            return text.trim().length >= 2 && text.length <= 100;
          }}
          textChanged={(text) => {
            setLastName(text);
          }}
        />

        <Input
          defaultValue={goal.toString()}
          iconName="flag-checkered"
          label="Objectif journalier en KCal"
          errorMessage="Veuillez saisir un nombre entier supérieur à 100 KCal!"
          validation={(text) => {
            return (
              text.length > 0 &&
              /^\d+$/.test(text) &&
              Number.parseInt(text) != undefined &&
              Number.parseInt(text) > 100
            );
          }}
          keyboardType="numeric"
          textChanged={(text) => {
            let g = Number.parseInt(text);

            if (g != undefined) {
              setGoal(g);
            }
          }}
        />

        {errorMessage != undefined && errorMessage.length > 0 && (
          <Text
            style={{
              color: Colors.COLOR_RED,
              fontSize: 12,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {errorMessage}
          </Text>
        )}

        <Button
          title="Sauvegarder"
          color={Colors.COLOR_LIGHT_GREEN}
          disabled={
            firstName == undefined && lastName == undefined && goal == undefined
          }
          onPress={() => {
            console.log("User json value");
            console.log(userJson);

            let user = new User(firstName, lastName, goal);

            console.log("Instanciated user");
            console.log(user);

            if (user?.isValid == true) {
              userService.saveUser(user, (result: boolean) => {
                if (result === true) {
                  dispatch(setUserJson(JSON.stringify(user)));
                  setIsCreated(true);
                  setErrorMessage("");
                }
              });
            } else {
              setErrorMessage(
                "Un des champs est incorrect ! Veuillez correctement saisir les informations !"
              );
            }
          }}
        />

        {isCreated && (
          <Text
            style={{
              color: Colors.COLOR_LIGHT_GREEN,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Votre profil a correctement été crée
          </Text>
        )}
      </SafeAreaView>
    </>
  );
}
