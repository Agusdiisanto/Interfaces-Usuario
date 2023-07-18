import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter, withLayoutContext } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AuthContext from "../../context/AuthContext";
import Api from "../../service/Api";
import { StyleSheet } from "react-native";
import { useContext } from "react";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props) {
  
  const router = useRouter();
  const {loggedUser} = useContext(AuthContext)

  const logout = () => {
    Api.clearToken()
    router.replace("Verification")
  };

  return (
    <DrawerContentScrollView {...props} styles={styles.drawerLabel}>
     <DrawerItem
        label="Home"
        onPress={() => router.replace("Home")}
        icon={() => <FontAwesome name="home" color="#00acee" size={35} />}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Profile"
        onPress={() => router.push(`User/${loggedUser.id}`)}
        icon={() => <FontAwesome name="user" color="#00acee" size={35} />}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Twitter Blue"
        onPress={() => router.push("CommingSoon")}
        icon={() => <FontAwesome name="twitter" color="#00acee" size={35} />}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="BookMarks"
        onPress={() => router.push("CommingSoon")}
        icon={() => <FontAwesome name="bookmark" color="#00acee" size={35} />}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Logout"
        onPress={logout}
        icon={() => <FontAwesome name="sign-out" color="#00acee" size={35} />}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    
      <Drawer backBehavior="firstRoute" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Home" }}
        />
      </Drawer>
    
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 16,
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "black",
    fontWeight: 700,
  },
  drawerItem:{
    fontSize: 20,
  }
 
});
