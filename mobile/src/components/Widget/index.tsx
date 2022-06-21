import React, { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Options } from '../../components/Options';
import { Form } from '../../components/Form';
import { Success } from '../../components/Success';

// FeedbackType means that it will be the key string. like 'BUG', 'OTHER', etc.
export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleBack() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSent() {
    setFeedbackSent(true);
  }

  //useState<FeedbackType | null>(null) means that it initial state is null, and it can be a FeedbackType or null
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} weight="bold" />
      </TouchableOpacity>
      {/* Snap points is bottom sheet positioning, 1 being initial position, 280 final position */}
      <BottomSheet ref={bottomSheetRef} snapPoints={[1, 280]} backgroundStyle={styles.modal} handleIndicatorStyle={styles.indicator}>
        {
          // Has any feedback been sent?
          feedbackSent ? (
            // Yes? then show success screen
            <Success
              // If 'report again' has been clicked, then there is no feedback sent or type selected
              onSendAnotherFeedback={handleBack}
            />
          ) : (
            // no? then choose between feedback types or feedback form
            <>
              {
                // has any feedback type been selected?
                feedbackType ? (
                  // yes? then show feedback form screen
                  <Form
                    //feedback type receives actual feedback type name, parsed through typeof
                    feedbackType={feedbackType}
                    //if arrow has been clicked then there is no feedback sent or type selected
                    onFeedbackCancelled={handleBack}
                    //if submit has been clicked, then there is a submitted feedback
                    onFeedbackSent={handleSent}
                  />
                ) : (
                  // no? then show feedback types screen
                  <Options onFeedbackTypeChanged={setFeedbackType} />
                )
              }
            </>
          )
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
