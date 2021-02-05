import React, { createRef } from 'react';
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

// Class-based component
class ClassComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webRef: createRef(),
      chatStarted: false,
      lcwReady: false
    }
  }

  onMessage(event) {
    if (event.nativeEvent.data === "lcw:ready"){
      console.log("[Event][lcw:ready]");
      this.setState({
        lcwReady: true
      });
    }
    else if (event.nativeEvent.data === "lcw:threadUpdate"){
      console.log("[Event][lcw:threadUpdate]");
    }
  }

  buttonStart() {
    console.log(`[buttonStart]`);
    const {webRef} = this.state;
    webRef.current?.injectJavaScript(startChatCommand);
  }

  buttonEnd() {
    console.log(`[buttonEnd]`);
    const {webRef} = this.state;
    webRef.current?.injectJavaScript(endChatCommand);
  }

  componentDidMount () {
    console.log('[componentDidMount]');
    const {webRef, lcwReady, chatStarted} = this.state;
    if (webRef && !chatStarted) {
      if (!lcwReady) {
        webRef.current.injectJavaScript(initChatCommand);
        console.log(`[initChatCommand]`);
      }
      this.setState({
        chatStarted: true
      })
    }
  }

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            Running <Text style={styles.highlight}>Omnichannel LiveChatWidget</Text>
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="start" onPress={(event) => this.buttonStart(event)} disabled={!this.state.lcwReady}/>
            <Button title="end" color="#f194ff" onPress={(event) => this.buttonEnd(event)} disabled={!this.state.lcwReady}/>
          </View>
        </View>
        <WebView
          style={styles.webView}
          ref={this.state.webRef}
          source={source}
          incognito={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={false}
          onMessage={(event) => this.onMessage(event)}
          javaScriptEnabledAndroid={true}
        />
      </>
    )
  }
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

export default ClassComponent;
