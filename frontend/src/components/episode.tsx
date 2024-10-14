import { Card, CardContent } from "@/components/ui/card";

export default function Episode() {
  return (<>
    <div className="flex items-center mb-4">
      <h1 className="text-xl font-semibold">Episodes</h1>
    </div>
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-start">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==" 
            alt="Placeholder" 
            className="w-20 h-20 mr-4 bg-gray-300"
          />
          <div className="flex-1">
            <p className="text-gray-500 text-sm">11 Oct 2024</p>
            <h2 className="text-xl font-bold my-2">#448 - Jordan Peterson: Nietzsche, Hitler, God, Psychopathy, Suffering & Meaning</h2>
            <p className="text-sm">Lex Fridman Podcast</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </>)
}
