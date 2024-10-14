import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Camera, Image, Zap, Gift, Bell, User } from 'lucide-react';

const MeshyInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/32/32" alt="Meshy Logo" className="w-8 h-8" />
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Image to 3D</a>
            <a href="#" className="hover:text-gray-300">Community</a>
            <a href="#" className="hover:text-gray-300">My Assets</a>
            <a href="#" className="hover:text-gray-300">API</a>
            <Select>
              <SelectTrigger className="w-[100px] bg-transparent border-none">
                <SelectValue placeholder="Resources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="docs">Docs</SelectItem>
                <SelectItem value="tutorials">Tutorials</SelectItem>
              </SelectContent>
            </Select>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><img src="/api/placeholder/16/16" alt="Coin" className="w-4 h-4 mr-1" /> 210</span>
          <Button variant="outline" className="bg-green-600 text-white border-none"><Zap className="mr-2" size={16} /> Get Credits</Button>
          <Gift size={20} />
          <Bell size={20} />
          <User size={20} />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <div className="w-1/4 p-4 border-r border-gray-700">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Image</h2>
            <img src="/api/placeholder/200/300" alt="Blonde Doll" className="w-full rounded-lg mb-2" />
            <Button className="w-full">Re-upload</Button>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Name</h2>
            <Input value="Blonde Doll in Red Dress" className="bg-gray-800 border-gray-700" />
          </div>
          <div className="mb-4">
            <span className="inline-block bg-gray-800 text-sm px-2 py-1 rounded">#warm tone#</span>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">AI Model</h2>
            <Select>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                <SelectValue placeholder="Meshy-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meshy-4">Meshy-4</SelectItem>
                <SelectItem value="meshy-3">Meshy-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Target Polycount</h2>
            <ToggleGroup type="single" className="justify-between">
              <ToggleGroupItem value="3k">3K</ToggleGroupItem>
              <ToggleGroupItem value="10k">10K</ToggleGroupItem>
              <ToggleGroupItem value="30k" className="bg-green-700">30K</ToggleGroupItem>
              <ToggleGroupItem value="100k">100K</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Topology</h2>
            <ToggleGroup type="single" className="justify-between">
              <ToggleGroupItem value="quad">Quad</ToggleGroupItem>
              <ToggleGroupItem value="triangle" className="bg-green-700">Triangle</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Symmetry</h2>
            <ToggleGroup type="single" className="justify-between">
              <ToggleGroupItem value="off">Off</ToggleGroupItem>
              <ToggleGroupItem value="auto" className="bg-green-700">Auto</ToggleGroupItem>
              <ToggleGroupItem value="on">On</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Estimated time:</span>
              <span>1 minute</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>Credit cost:</span>
              <span>20 credits</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">Generate</Button>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <Input placeholder="Search my generation" className="w-1/3 bg-gray-800 border-gray-700" />
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Date created" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Generated images would go here */}
            <div className="bg-gray-800 rounded-lg aspect-square"></div>
            <div className="bg-gray-800 rounded-lg aspect-square"></div>
            <div className="bg-gray-800 rounded-lg aspect-square"></div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-1/3 p-4 border-l border-gray-700">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Render Mode</span>
              <span>Color</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Vertices</span>
              <span>40,281</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Faces</span>
              <span>49,957</span>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg aspect-square mb-4"></div>
          <Button className="w-full mb-2">Retry</Button>
          <div className="flex justify-between">
            <img src="/api/placeholder/64/64" alt="Thumbnail 1" className="w-16 h-16 rounded" />
            <img src="/api/placeholder/64/64" alt="Thumbnail 2" className="w-16 h-16 rounded" />
            <img src="/api/placeholder/64/64" alt="Thumbnail 3" className="w-16 h-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeshyInterface;
