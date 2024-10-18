import Episode from "./episode";
import Audio from "./audio";
import Transcript from "./transcript";
import { useEffect } from "react";
import { BASE_URL } from "@/lib/constant";
import { useJsonData } from "@/hooks/useJsonData";
import { useStreamText } from "@/hooks/useStreamText";

interface ContentProps {
  summaryTextChunks: string[];
  isSummaryLoading: boolean;
  summaryError: string | null;
  isSummaryDone: boolean;
  podInfoData: {
    title: string;
    host_name: string;
  };
  isPodInfoLoading: boolean;
  podInfoError: string | null;
  isPodInfoDone: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  formData: FormData
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}
export default function Content({
  formData,
  podInfoData,
  isPodInfoLoading,
  podInfoError,
  summaryTextChunks,
  isSummaryLoading,
  summaryError,
  isSummaryDone,
  setIsGenerating,
  activeTab,
  setActiveTab,
}: ContentProps) {
  const {
    data: audioData,
    error: audioError,
    isLoading: isAudioLoading,
    fetchJsonData: audioFetchJsonData
  } = useJsonData();

  const {
    textChunks: transcriptTextChunks,
    finalResult: transcriptFinalResult,
    error: transcriptError,
    isLoading: transcriptIsLoading,
    isDone: transcriptIsDone,
    fetchStreamText: transcriptFetchStreamText
  } = useStreamText();

  useEffect(() => {
    if (isSummaryDone && !summaryError) {
      transcriptFetchStreamText(`${BASE_URL}/generate_transcript`, formData);
      setActiveTab("transcript");
    }
  }, [isSummaryDone]);
  

  useEffect(() => {
    if (transcriptFinalResult) {
      const audioFormData = new FormData();
      audioFormData.append('text', transcriptFinalResult.content);
      audioFormData.append('language', formData.get('language') as string);
      audioFetchJsonData(`${BASE_URL}/generate_audio`, audioFormData);
    }
  }, [transcriptFinalResult])

  useEffect(() => {
    if ((audioData)
        || audioError
        || summaryError
        || podInfoError
        || transcriptError
      ) {
      setIsGenerating(false);
    }
  }, [audioData, audioError, summaryError, podInfoError, transcriptError]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-shrink-0 flex-basis-auto">
        <Episode
          isPodInfoLoading={isPodInfoLoading}
          podInfoError={podInfoError}
          podInfoData={podInfoData}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <Transcript
          isSummaryLoading={isSummaryLoading}
          summaryError={summaryError}
          summaryTextChunk={summaryTextChunks}
          isSummaryDone={isSummaryDone}
          transcriptTextChunks={transcriptTextChunks}
          transcriptError={transcriptError}
          transcriptIsLoading={transcriptIsLoading}
          transcriptIsDone={transcriptIsDone}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex-shrink-0 flex-basis-auto">
        <Audio
          audioError={audioError}
          // @ts-ignore
          audioUrl={audioData?.audio_url}
          isAudioLoading={isAudioLoading}
        />
      </div>
    </div>
  );
}
