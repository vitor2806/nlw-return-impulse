import { ChatTeardropDots } from 'phosphor-react';
import { Popover } from '@headlessui/react';
import { WidgetForm } from './WidgetForm';

export function Widget() {
  return (
    <Popover className="absolute bottom-4 right-6 flex flex-col items-end md:right-7 md:bottom-7">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatTeardropDots className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-focus:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}

/*
Below structure can be replace with above struct for accessibility purpose and easy implementation.
export function Widget() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  function toggleWidgetVisibility() {
    setIsWidgetOpen(!isWidgetOpen);
  }
  return (
    <div className="absolute bottom-4 right-6">
      ? : can be used as && if there isn't an else condition
      {isWidgetOpen && <p>Hello World</p>}
      <button onClick={toggleWidgetVisibility} className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatTeardropDots className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-focus:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </button>
    </div>
  );
}
*/
