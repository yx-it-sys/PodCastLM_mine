import Content from "./components/content";
import Menu from "./components/menu";
import { useJsonData } from "./hooks/useJsonData";
import { useStreamText } from './hooks/useStreamText';
import { BASE_URL } from "./lib/constant";

function App() {
  const {
    textChunks: summaryTextChunks,
    finalResult: summaryFinalResult,
    error: summaryError,
    isLoading: isSummaryLoading,
    isDone: isSummaryDone,
    fetchStreamText: fetchSummaryText
  } = useStreamText();

  const {
    data: podInfoData,
    error: podInfoError,
    isLoading: isPodInfoLoading,
    fetchJsonData: fetchPodInfo, 
  } = useJsonData();


  const handleGenerate = () => {
    // 清除所有状态
    fetchSummaryText(`${BASE_URL}/summarize`);
    fetchPodInfo(`${BASE_URL}/pod_info`);
  }
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-grow flex">
        <Menu handleGenerate={handleGenerate} />
        <Content
          summaryTextChunks={summaryTextChunks}
          summaryFinalResult={summaryFinalResult} 
          isSummaryLoading={isSummaryLoading}
          summaryError={summaryError}
          isSummaryDone={isSummaryDone}
          isPodInfoLoading={isPodInfoLoading}
          podInfoError={podInfoError}
          // @ts-ignore
          podInfoData={podInfoData?.content}
        />
      </main>
    </div>
  );
}

export default App;
