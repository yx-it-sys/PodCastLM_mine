import React from 'react';
import DialogueItem from './dialog-item';
import { AlertCircle, Loader2, MessageSquare } from 'lucide-react';

interface DialogueListProps {
  textChunks: string[];
  transcriptError: string | null;
  transcriptIsLoading: boolean;
}

const DialogueList: React.FC<DialogueListProps> = ({ textChunks, transcriptError, transcriptIsLoading }) => {
  const parseDialogue = (text: string) => {
    const dialogueRegex = /\*\*(.*?)\*\*:\s*((?:(?!\*\*).)*)/gs;
    const matches = Array.from(text.matchAll(dialogueRegex));
    
    return matches.map(match => ({
      speaker: match[1],
      content: match[2].trim(),
      avatar: match[1] === 'Host' ? '/host-avatar.png' : '/guest-avatar.png'
    }));
  };

  const fullText = textChunks.join('');
  const dialogueItems = parseDialogue(fullText);

  if (transcriptError) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-md">
        <AlertCircle className="mr-2" />
        <p>Error: {transcriptError}</p>
      </div>
    );
  }

  if (dialogueItems.length === 0 && !transcriptIsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Transcript yet</h3>
        <p className="text-gray-500 mb-6">Start a new conversation to see the transcript here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dialogueItems.map((item, index) => (
        <DialogueItem
          key={index}
          speaker={item.speaker}
          content={item.content}
          isUser={item.speaker === 'Host'}
        />
      ))}
      {transcriptIsLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading more...</p>
        </div>
      )}
    </div>
  );
};

export default DialogueList;
