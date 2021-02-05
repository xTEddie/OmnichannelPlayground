# SampleRNAppUsingLCW

Sample react-native app using WebView with LiveChatWidget

## Getting Started

### 1. Install dependencies via `yarn install`

### 2. Copy the widget snippet code from the Code snippet section and save it somewhere. It will be needed later on.

It should look similar to this:

```html
<script
    id="Microsoft_Omnichannel_LCWidget"
    src="[your-src]"
    data-app-id="[your-app-id]"
    data-org-id="[your-org-id]"
    data-org-url="[your-org-url]"
>
</script>
```

### 3. **Add** your chat widget config to `omnichannelConfig` in [ClassComponent.js](src/components/ClassComponent.js) and [FunctionalComponent.js](src/components/FunctionalComponent.js)

```js
const omnichannelConfig = {
  src: '[your-src]',
  appId: '[your-app-id]',
  orgId: '[your-org-id]',
  orgUrl: '[your-org-url]'
};

```

3. Run App via `yarn run android` or `yarn run ios`


