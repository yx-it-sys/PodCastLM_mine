export default function Header() {
  return (<>
     <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/32/32" alt="Meshy Logo" className="w-8 h-8" />
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Image to 3D</a>
            <a href="#" className="hover:text-gray-300">Community</a>
            <a href="#" className="hover:text-gray-300">My Assets</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><img src="/api/placeholder/16/16" alt="Coin" className="w-4 h-4 mr-1" /> 210</span>
        </div>
      </header>
  </>)
}
