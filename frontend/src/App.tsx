import Content from "./components/content";
import Header from "./components/header";
import Menu from "./components/menu";


function App() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex">
        <Menu />
        <Content />
      </main>
    </div>
  );
}

export default App;
