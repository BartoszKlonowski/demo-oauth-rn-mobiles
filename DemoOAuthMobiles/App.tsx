import React, { useCallback } from 'react';
import {
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from './components/Button';

function App(): React.JSX.Element {
  const urlBase = "https://github.com/login/oauth/authorize";
  const requestParams = {
  }

  const handlePress = useCallback(async () => {
      const keys = Object.keys(requestParams);
      const vals = Object.values(requestParams);
      let reqParams = "";
      for (let i = 0; i < keys.length; i++) {
        reqParams += '&';
        reqParams += `${keys[i]}=${vals[i]}`;
      }
      const reqUrl = urlBase + `?${reqParams}`;
      console.log("requesting: ", reqUrl);
      await Linking.openURL(reqUrl);
  }, [urlBase]);

      // Listen to incoming links from deep linking
  Linking.addEventListener('url', ({ url }) => {
    console.log("URL received: ", url);
  });

  return (
    <View style={styles.mainContainer}>
      <Button onPress={handlePress} title='Log In'/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
