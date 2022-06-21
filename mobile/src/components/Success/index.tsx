import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

// This came from widget when invoking <Success onSendAnotherFeedback={handleBack} />, so success will proc handleBack
interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Thank you!</Text>
      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Report again</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}
