export default function Episode() {
  return (<>
    <div className="flex items-start bg-gradient-to-br from-cyan-800/10 to-violet-800/10 p-8 rounded-lg shadow-sm shadow-gray-200/50">
      <img 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==" 
        alt="Placeholder" 
        className="w-40 h-40 mr-4 bg-gray-300 rounded-2xl"
      />
      <div className="flex-1 h-40 flex flex-col">
        <h2 className="text-xl font-bold my-2">Jordan Peterson</h2>
        <p className="text-sm text-gray-600">Lex Fridman PodcastLex Fridman PodLex Fridman PodLex </p>
      </div>
    </div>
  </>)
}
