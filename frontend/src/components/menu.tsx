import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Mic, Clock, Globe } from "lucide-react";

export default function Menu({ handleGenerate }: { handleGenerate: () => void }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [tone, setTone] = useState('funny');
  const [duration, setDuration] = useState('short');
  const [language, setLanguage] = useState('en');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // const formData = {
    //   pdfFile,
    //   textInput,
    //   tone,
    //   duration,
    //   language
    // };

    handleGenerate();
  };

  return (
    <div className="w-full md:w-1/4 p-6 border-r border-gray-200 bg-white flex flex-col h-full text-gray-800 hidden md:flex shadow-md shadow-gray-300/50">
      <div className="flex-grow overflow-y-auto space-y-8">
        <div className="transition-all duration-300">
          <h2 className="text-lg font-semibold mb-3 flex items-center"><Upload className="mr-2 text-gray-600" size={20} /> Upload PDF</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              id="pdf-upload" 
              onChange={handleFileChange}
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {pdfFile ? pdfFile.name : "Click to upload PDF"}
              </p>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center"><FileText className="mr-2 text-gray-600" size={20} /> Text Input</h2>
          <Textarea 
            style={{"resize": "none"}}
            placeholder="Enter your text here..." 
            className="w-full h-40 bg-gray-50 border-gray-200 text-gray-800 rounded-xl focus:border-gray-400 focus:ring-gray-400"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center"><Mic className="mr-2 text-gray-600" size={20} /> Tone</h2>
          <Select onValueChange={setTone}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-800 rounded-xl">
              <SelectValue placeholder={tone} defaultValue={tone}/>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl">
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="happy">Happy</SelectItem>
              <SelectItem value="sad">Sad</SelectItem>
              <SelectItem value="excited">Excited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center"><Clock className="mr-2 text-gray-600" size={20} /> Duration</h2>
          <Select onValueChange={setDuration}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-800 rounded-xl">
              <SelectValue placeholder={duration} defaultValue={duration}/>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl">
              <SelectItem value="short">Short (30s)</SelectItem>
              <SelectItem value="medium">Medium (1min)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center"><Globe className="mr-2 text-gray-600" size={20} /> Language</h2>
          <Select onValueChange={setLanguage}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-800 rounded-xl">
              <SelectValue placeholder={language} defaultValue={language}/>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
