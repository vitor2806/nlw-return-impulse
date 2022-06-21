import { feedbackTypes, FeedbackType } from '..';
import { CloseButton } from '../../CloseButton';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <CloseButton />
        <span className="text-xl leading-6">Send your feedback</span>
      </header>
      <div className="flex py-8 gap-2 w-full">
        {/* with map method I can choose between returning an item(object) or returning key:values. With key:values it is easier to access each value */}
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            // I MUST use KEY attribute so react can understand which element is being created. Its an id.
            <button
              key={key}
              // I'm using () => function because this way I can call the function with a parameter. (key as FeedbackType) because typescript expects that state will receive null, so when I say key as FeedbackType, I'm obligating it to use an already existing type.
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              className="bg-zinc-800 rounded-lg py-5 w-28 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
