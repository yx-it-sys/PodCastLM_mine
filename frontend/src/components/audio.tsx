import AudioPlayer from "react-modern-audio-player";
import { Card, CardContent } from "./ui/card";

// 使用真实链接的 playList 数据
const playList = [
  {
    name: "The Power of Ideas",
    writer: "Jordan Peterson",
    img: "https://plus.unsplash.com/premium_photo-1727558768347-eefa5276de9d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    id: 1,
  },
];

export default function Audio() {
  return (
    <div>
      <Card>
        <CardContent>
          <div className="mt-4">
            <AudioPlayer
              playList={playList}
              activeUI={{
                ...{all: true},
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
