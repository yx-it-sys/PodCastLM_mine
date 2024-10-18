import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface EpisodeProps {
  isPodInfoLoading: boolean;
  podInfoError: string | null;
  podInfoData: {
    title: string;
    host_name: string;
  };
}

export default function Episode({ isPodInfoLoading, podInfoError, podInfoData }: EpisodeProps) {

  return (
    <div className="flex items-start bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50  p-8 rounded-2xl shadow-xl shadow-gray-200/50 mx-12 my-4">
      <img 
        src="/cover1.png" 
        alt={podInfoData?.title || "Episode thumbnail"} 
        className="w-40 h-40 mr-4 bg-gray-300 rounded-2xl object-cover"
      />
      {
        isPodInfoLoading && (
          <div className="flex-1 h-40 flex flex-col">
            <Skeleton className="h-6 my-2 w-3/4 rounded-xl" />
            <Skeleton className="h-6 w-1/2 rounded-xl" />
          </div>
        )
      }
      {
        podInfoError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {podInfoError || "An error occurred while loading the episode data."}
            </AlertDescription>
          </Alert>
        )
      }
      {
        !isPodInfoLoading && !podInfoError && (
          <div className="flex-1 h-40 flex flex-col">
            <h2 className="text-xl font-bold my-2">{podInfoData?.title || "播客标题"}</h2>
          <p className="text-sm text-gray-600">主讲人: {podInfoData?.host_name || "未知"}</p>
        </div>
      )}
    </div>
  )
}
