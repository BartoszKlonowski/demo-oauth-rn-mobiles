import React, { useCallback, useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from './components/Button';

function App(): React.JSX.Element {
  const [token, setToken] = useState("");
  const urlBase = "https://github.com/login/oauth/authorize";
  const requestParams = {
    redirect_uri: "DemoOAuthMobiles://code",
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
    setToken(url.split("?")[1].split("=")[1]);
  });

  return (
    <View style={styles.mainContainer}>
      <Button onPress={handlePress} title='Log In'/>
      <View style={styles.tokenResultContainer}><Text>Token is:</Text><Text>{token}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  tokenResultContainer: {
    alignItems: "center",
    padding: 15,
    height: 250,
    width: 250
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default App;
