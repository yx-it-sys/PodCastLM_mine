import AudioPlayer from "react-modern-audio-player";
import { Card, CardContent } from "./ui/card";
import { HOST_URL } from "@/lib/constant";
import { AlertCircle, Headphones, Loader2 } from "lucide-react";

export default function Audio({ audioUrl, isAudioLoading, audioError }: { audioUrl: string | null, isAudioLoading: boolean, audioError: string | null }) {
  const playList = [
    {
      img: "/public/cover1.png",
      src: audioUrl ? `${HOST_URL}${audioUrl}` : '',
      id: 1,
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-2">
          {isAudioLoading ? (
              <div className="rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
                <div>
                <p className="text-gray-800 font-medium">Generating conversation...</p>
                <p className="text-gray-500 text-sm">This may take a few minutes. No need to stick around!</p>
                </div>
              </div>
          ) : audioError ? (
            <div className="flex items-center justify-center text-red-500">
              <AlertCircle className="mr-2" />
              <p>音频生成失败: {audioError}</p>
            </div>
          ) : audioUrl ? (
            <AudioPlayer
              playList={playList}
              activeUI={{
                playButton: true,
                prevNnext: true,
                volume: true,
                volumeSlider: true,
                repeatType: true,
                trackTime: true,
                trackInfo: false,
                artwork: true,
                progress: "bar"
              }}
              placement={{
                player: "static",
                playList: "top",
              }}
              rootContainerProps={{
                colorScheme: "light",
                width: "100%"
              }}
            />
          ) : (
            <>
              <div className="rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <Headphones className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">No audio available</p>
                  <p className="text-gray-500 text-sm">Start a new conversation to see the audio here.</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
