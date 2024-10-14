import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Episode from "./episode";
import { Card, CardContent } from "./ui/card";
import Audio from "./audio";

export default function Content() {
  return (
    <>
      <div className="flex-1 p-6">
        <Episode />
        <Audio />
        <Tabs defaultValue="summary" className="w-full mt-4">
          <div className="flex justify-center mb-4">
            <TabsList className="inline-flex">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="summary">
            <Card>
              <CardContent className="p-4">
                <p>In this podcast episode, the hosts explore the complex interplay between powerful ideas and how we perceive them, drawing on Nietzsche's philosophical insights to examine their relevance to contemporary ideology, communication, and morality. Peterson argues that while ideas can inspire and bring people together, they also have the potential to lead to chaos if they're based on flawed premises. The conversation touches on themes like sacrifice, the importance of being in tune with reality, and the influence of personal experiences. Ultimately, the episode highlights the need for careful discernment in recognizing truly unifying ideas, encouraging listeners to confront their moral dilemmas and pursue meaningful self-improvement despite societal challenges.</p>
                <h3 className="font-semibold mt-4 mb-2">Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Jordan Peterson's writing style and approach are heavily influenced by Nietzsche, particularly Nietzsche's succinct and aphoristic style. He finds Nietzsche's work endlessly analyzable, with every sentence worthy of deep consideration.</li>
                  <li>Great writers, like Nietzsche and Mircea Eliade, craft writing that evokes deep imagery, adding a layer of meaning beyond the literal words. This imagistic quality profoundly affects perception and action in the reader.</li>
                  <li>Perception is not passive; it's inherently active and value-saturated, shaped</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transcript">
            {/* Transcript content */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
