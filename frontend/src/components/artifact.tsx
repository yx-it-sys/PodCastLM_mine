import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, MoreHorizontal } from 'lucide-react';

const PodcastInterface = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧导航栏 */}
      <div className="w-16 bg-white flex flex-col items-center py-4 space-y-8">
        <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-6">
        <div className="flex items-center mb-4">
          <ArrowLeft className="mr-4" />
          <h1 className="text-xl font-semibold">Episodes</h1>
          <span className="text-gray-500 ml-2">#448 - Jordan Peterson: Nietzsche, Hitler, God, ...</span>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-start">
              <img src="/api/placeholder/80/80" alt="Lex Fridman" className="w-20 h-20 mr-4" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm">11 Oct 2024</p>
                <h2 className="text-xl font-bold my-2">#448 - Jordan Peterson: Nietzsche, Hitler, God, Psychopathy, Suffering & Meaning</h2>
                <p className="text-sm">Lex Fridman Podcast</p>
              </div>
            </div>
            <div className="flex mt-4">
              <Button className="mr-2"><Play className="mr-2" /> Play</Button>
              <Button variant="outline"><MoreHorizontal /></Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="mindmap">Mindmap</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="shownotes">Shownotes</TabsTrigger>
          </TabsList>
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
          {/* Other tab contents would go here */}
        </Tabs>
      </div>
    </div>
  );
};

export default PodcastInterface;
