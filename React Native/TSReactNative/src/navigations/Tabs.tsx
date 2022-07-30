import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Alert } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ScannerScreen from "../screens/ScannerScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export type RootStackParamList = {
    Home : undefined;
    History : undefined;
    Scanner: undefined;
    Settings : undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="home"
                color={focused ? Colors.COLOR_RED : Colors.COLOR_GRAY}
                size={25}
              />
              <Text
                style={{
                  color: focused ? Colors.COLOR_RED : Colors.COLOR_GRAY,
                  fontSize: 12,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => createIcon(focused, 'history'),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="add" size={30} color="#ffffff" />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} onPress={() => navigation.navigate("Scanner", )}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="account-circle"
                color={focused ? "#e32f45" : "#748c94"}
                size={25}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="settings"
                color={focused ? "#e32f45" : "#748c94"}
                size={25}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function createIcon(focused: boolean, iconName: string) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Icon
        name={iconName}
        color={focused ? "#e32f45" : "#748c94"}
        size={25}
      />
      <Text style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}>
        HISTORY
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
