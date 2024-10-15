import Episode from "./episode";
import Audio from "./audio";
import Transcript from "./transcript";

export default function Content() {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-shrink-0 flex-basis-auto">
        <Episode />
      </div>
      <div className="flex-grow overflow-hidden">
        <Transcript />
      </div>
      <div className="flex-shrink-0 flex-basis-auto">
        <Audio />
      </div>
    </div>
  );
}
