import Content from "./components/content";
import Menu from "./components/menu";


function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* <NavBar /> */}
      <main className="flex-grow flex">
        <Menu />
        <Content />
      </main>
    </div>
  );
}

export default App;
