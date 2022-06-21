import bugImageUrl from '../../assets/Figmoji/bug.svg';
import ideaImageUrl from '../../assets/Figmoji/idea.svg';
import thoughtImageUrl from '../../assets/Figmoji/thought.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Bug',
    image: {
      source: bugImageUrl,
      alt: 'A bug image',
    },
  },
  OTHER: {
    title: 'Suggestion',
    image: {
      source: ideaImageUrl,
      alt: 'A lamp image',
    },
  },
  IDEA: {
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'A thought cloud',
    },
  },
};

// This is typing feedbacks. There will be only selectable feedbacks types that already exists in my feedbackTypes object.
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  //This allow me to know which type of feedback user is choosing
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  // This will return feedback is either sent or not.
  const [feedbackSent, setFeedbackSent] = useState(false);

  //This allow me to restart feedback type to null, so when user interact with return arrow it shows up feedback types again
  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {/* If feedback has been sent, then show success screen, else if feedback type has been selected, then show comment screen, else, show feedback type screen */}
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {
            //Is there any feedback type selected?
            !feedbackType ? (
              // No? Then show all of them
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              // Yes? Then show sent feedback screen
              <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback} onFeedbackSent={() => setFeedbackSent(true)} />
            )
          }
        </>
      )}

      <footer className="text-xs text-neutral-400">
        <span>
          Made by{' '}
          <a href="https://github.com/vitor2806" className="underline underline-offset-2">
            Vitor
          </a>
        </span>
      </footer>
    </div>
  );
}
