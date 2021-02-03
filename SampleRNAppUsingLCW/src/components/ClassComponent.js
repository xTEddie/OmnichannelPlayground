import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// Class-based component
class ClassComponent extends React.Component {
  render() {
    return (
      <>
        <View styles={styles.container}>
          <Text> Class </Text>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ClassComponent;
