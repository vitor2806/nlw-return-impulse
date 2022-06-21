import React from 'react';
import { View, Text, Linking } from 'react-native';

import { styles } from './styles';

export function Copyright() {
  return (
    <View>
      <Text style={styles.text}>
        Made by
        <Text onPress={() => Linking.openURL('https://github.com/vitor2806')}> Vitor</Text>
      </Text>
    </View>
  );
}
