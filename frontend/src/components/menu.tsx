import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Mic, Clock, Globe } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const DEMO_PDF_URL = '/demo.pdf'; // 替换为你的演示 PDF 文件的实际路径

export default function Menu({ handleGenerate, isGenerating }: { handleGenerate: (formData: FormData) => void, isGenerating: boolean }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [tone, setTone] = useState('neutral');
  const [duration, setDuration] = useState('short');
  const [language, setLanguage] = useState('English');
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size exceeds 5MB limit.');
        setPdfFile(null);
      } else {
        setFileError(null);
        setPdfFile(file);
      }
    }
  };

  const handleDemoPdfClick = async () => {
    try {
      const response = await fetch(DEMO_PDF_URL);
      const blob = await response.blob();
      const file = new File([blob], 'demo.pdf', { type: 'application/pdf' });
      setPdfFile(file);
      setFileError(null);
    } catch (error) {
      console.error('Error loading demo PDF:', error);
      setFileError('Failed to load demo PDF.');
    }
  };

  const handleSubmit = () => {
    if (!pdfFile) {
      setFileError('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('textInput', textInput);
    formData.append('tone', tone);
    formData.append('duration', duration);
    formData.append('language', language);

    console.log(formData);

    handleGenerate(formData);
  };

  return (
    <div className="w-full md:w-1/4 p-6 border-r border-gray-200 bg-white flex flex-col h-full text-gray-800 hidden md:flex shadow-md shadow-gray-300/50">
      <div className="flex-grow overflow-y-auto space-y-8">
        <div className="transition-all duration-300">
          <h2 className="text-lg font-semibold mb-3 flex items-center"><Upload className="mr-2 text-gray-600" size={20} /> Upload PDF *</h2>
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
              <p className="mt-1 text-xs text-gray-500">
                PDF file size should not exceed 5MB
              </p>
            </label>
          </div>
          {fileError && <p className="text-red-500">{fileError}</p>}
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-sm text-gray-500">Try Demo: </span>
            <button
              onClick={handleDemoPdfClick}
              className="text-sm  underline"
            >
              introduce_chatgpt.pdf
            </button>
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
            <SelectContent className="bg-white border-gray-200 rounded-xl" >
              <SelectItem value="neutral" className="cursor-pointer hover:bg-gray-100">Neutral</SelectItem>
              <SelectItem value="happy" className="cursor-pointer hover:bg-gray-100">Happy</SelectItem>
              <SelectItem value="sad" className="cursor-pointer hover:bg-gray-100">Sad</SelectItem>
              <SelectItem value="excited" className="cursor-pointer hover:bg-gray-100">Excited</SelectItem>
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
              <SelectItem value="short" className="cursor-pointer  hover:bg-gray-100">Short (1-2min)</SelectItem>
              <SelectItem value="medium" className="cursor-pointer hover:bg-gray-100">Medium (3-4min)</SelectItem>
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
              <SelectItem value="English" className="cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100">English</SelectItem>
              <SelectItem value="Chinese" className="cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          disabled={isGenerating}
          className={`w-full rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gray-800 hover:bg-gray-900'
          } text-white`}
          onClick={handleSubmit}
        >
           {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
      </div>
    </div>
  );
}
