import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { Loading } from './Loading';
import { backgroundPosition } from 'html2canvas/dist/types/css/property-descriptors/background-position';

interface CaptureButtonProps {
  screenshot: string | null;
  onCapture: (screenshot: string | null) => void;
}

export function CaptureButton({ onCapture, screenshot }: CaptureButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    // ! at document.querySelector means that there will always be a html tag, so never returns null
    const canvas = await html2canvas(document.querySelector('html')!);

    // when I click in capture button it will take a screenshot then convert it to text, this text can be placed at browser search bar and will return a image.
    const base64image = canvas.toDataURL('image/png');

    // when screenshots, send string format to onCapture function
    onCapture(base64image);

    setIsTakingScreenshot(false);
  }
  if (screenshot) {
    return (
      <button
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
        type="button"
        className="text-zinc-400 hover:text-zinc-200 transition-colors p-1 w-10 h-10 rounded-md flex border-transparent justify-end items-end"
        onClick={() => onCapture(null)}
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button onClick={handleTakeScreenshot} className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 " type="button">
      {
        // Is screenshot being taken?
        isTakingScreenshot ? (
          // yes? then show loading image
          <Loading />
        ) : (
          // no? then show camera image
          <Camera className="w-6 h-6" />
        )
      }
    </button>
  );
}
