import { ArrowLeft, Camera } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import { CloseButton } from '../../CloseButton';
import { CaptureButton } from '../CaptureButton';
import { Loading } from '../Loading';

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
  // This will handle feedback comment as it change, changing as well element state
  const [comment, setComment] = useState('');

  // function that handles user screenshot storage
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // feedbackTypeInfo receives (example) feedbackTypes['BUG'], so it has all BUG props
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  // verify if feedback is being send right now
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);
    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    });
    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        {/* Return arrow, when clicked it will call onFeedbackRestartRequested which will return "null" to feedbackType, then reset widget state */}
        <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-200" onClick={onFeedbackRestartRequested}>
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          // event.target.value will return text from textarea, every time this text change it updates comment state
          onChange={event => setComment(event.target.value)}
          /* Reminder: this element is using tailwind plugins, those are @tailwindcss/forms and tailwind-scrollbar. One to auto style forms, adding padding, etc, other to help style scrollbar */
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Tell us what's happening..."
        />

        <footer className="flex mt-2 gap-2">
          <CaptureButton onCapture={setScreenshot} screenshot={screenshot} />

          <button disabled={comment.length === 0 || isSendingFeedback} type="submit" className="disabled:opacity-50 disabled:hover:bg-brand-500 p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors">
            {isSendingFeedback ? <Loading /> : 'Submit'}
          </button>
        </footer>
      </form>
    </>
  );
}
