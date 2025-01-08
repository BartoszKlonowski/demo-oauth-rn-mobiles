import { StyleSheet, View } from "react-native";
import { NavigationProps } from "../navigation";

export const Profile = ({route}: NavigationProps<'Profile'>) => {
  const profile = route.params;
  return (
    <View style={styles.profileContainer}>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
  }
});
