import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function Menu() {
  return (
    <div className="w-1/4 p-6 border-r border-gray-200 bg-white flex flex-col h-full text-gray-800">
      <div className="flex-grow overflow-y-auto space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Upload PDF</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
            <input type="file" accept=".pdf" className="hidden" id="pdf-upload" />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Click to upload PDF</p>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Text Input</h2>
          <Textarea 
            placeholder="Enter your text here..." 
            className="w-full h-40 bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Tone</h2>
          <Select>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="happy">Happy</SelectItem>
              <SelectItem value="sad">Sad</SelectItem>
              <SelectItem value="excited">Excited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Duration</h2>
          <Select>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="short">Short (30s)</SelectItem>
              <SelectItem value="medium">Medium (1min)</SelectItem>
              <SelectItem value="long">Long (2min)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Language</h2>
          <Select>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg font-semibold transition-colors">
          Generate
        </Button>
      </div>
    </div>
  );
}
