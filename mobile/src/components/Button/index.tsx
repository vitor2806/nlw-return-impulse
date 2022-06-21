import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  isLoading: boolean;
}

// I need to parse ...rest with spread operator because of the existing props from react native components
export function Button({ isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {
        //Is submit loading?
        isLoading ? (
          // yes? then show loading icon
          <ActivityIndicator color={theme.colors.text_on_brand_color} />
        ) : (
          // no? then show submit text
          <Text style={styles.title}>Submit</Text>
        )
      }
    </TouchableOpacity>
  );
}
