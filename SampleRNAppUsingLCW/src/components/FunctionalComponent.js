import React, {createRef, useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { WebView } from 'react-native-webview';

const omnichannelConfig = {
  src: '',
  appId: '',
  orgId: '',
  orgUrl: ''
};

// Functional-based component
const FunctionalComponent = () => {
  const webRef = createRef();
  const [chatStarted, setChatStarted] = useState(false);
  const [lcwReady, setLcwReady] = useState(false);

  const source = { html: `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <script
          id="Microsoft_Omnichannel_LCWidget"
          src="${omnichannelConfig.src}"
          data-app-id="${omnichannelConfig.appId}"
          data-org-id="${omnichannelConfig.orgId}"
          data-org-url="${omnichannelConfig.orgUrl}"
          data-render-mobile="true"
          data-hide-chat-button="true"
        ></script>
      </head>
      <body>
      </body>
    </html>
  `};

  const initChatCommand = `
    window.addEventListener("lcw:ready", function() {
      // alert("lcw:ready");
      window.ReactNativeWebView.postMessage("lcw:ready");
    });

    // Handler when agent ended conversation
    window.addEventListener("lcw:threadUpdate", function() {
      // alert("Agent ended conversation");
      window.ReactNativeWebView.postMessage("lcw:threadUpdate");
    });
  `;

  const startChatCommand = `
    Microsoft.Omnichannel.LiveChatWidget.SDK.startChat();

    // Fix height
    document.getElementsByTagName("iframe").Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.style.height = "100%";
  `;

  const endChatCommand = `
    Microsoft.Omnichannel.LiveChatWidget.SDK.closeChat();
  `;

  // https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md#the-windowreactnativewebviewpostmessage-method-and-onmessage-prop
  const onMessage = (event) => {
    if (event.nativeEvent.data === "lcw:ready"){
      console.log("[Event][lcw:ready]");
      setLcwReady(true);
    }
    else if (event.nativeEvent.data === "lcw:threadUpdate"){
      console.log("[Event][lcw:threadUpdate]");
    }
  }

  const buttonStart = () => {
    console.log(`[buttonStart]`);
    webRef.current?.injectJavaScript(startChatCommand);
  }

  const buttonEnd = () => {
    console.log(`[buttonEnd]`);
    webRef.current?.injectJavaScript(endChatCommand);
  }

  useEffect(() => {
    if (webRef && !chatStarted) {
      if (!lcwReady) {
        webRef.current.injectJavaScript(initChatCommand);
        console.log(`[initChatCommand]`);
      }
      setChatStarted(true);
    }
  }, []);

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>
          Running <Text style={styles.highlight}>Omnichannel LiveChatWidget</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="start" onPress={buttonStart} disabled={!lcwReady}/>
          <Button title="end" color="#f194ff" onPress={buttonEnd} disabled={!lcwReady}/>
        </View>
      </View>
      <WebView
        style={styles.webView}
        ref={webRef}
        source={source}
        incognito={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        onMessage={onMessage}
        javaScriptEnabledAndroid={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webView: {
    flex: 1.1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default FunctionalComponent;