import React, { useCallback, useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from './components/Button';

const client_secret = "placeholder";
const client_id = "placeholder";

function App(): React.JSX.Element {
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const urlBase = "https://github.com/login/oauth/authorize";
  const requestParams = {
    client_id: client_id,
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

  const handlePost = useCallback(() => {
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        response_type: "token",
        code: token,
        redirect_uri: "DemoOAuthMobiles://code"
      }),
    }).then((response) => {
      response.json().then(res => {
        console.log("The response is: ", JSON.stringify(res));
        setAccessToken(res.access_token);
      }).catch(error => {
        console.log("cant open response, error: ", error);
      });
    }).catch(error => {
      console.log("The error is: ", error);
    });
  }, [token]);

      // Listen to incoming links from deep linking
  Linking.addEventListener('url', ({ url }) => {
    console.log("URL received: ", url);
    setToken(url.split("?")[1].split("=")[1]);
  });

  return (
    <View style={styles.mainContainer}>
      <Button onPress={handlePress} title='Log In'/>
      <View style={styles.tokenResultContainer}>
        <Text>Token is:</Text>
        <Text>{token}</Text>
        <Text>Access token is:</Text>
        <Text>{accessToken}</Text>
      </View>
      {token ? <Button onPress={handlePost} title='Continue' /> : null}
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
