import {Toolbar} from "./components/Toolbar";
import {Canvas} from "./components/Canvas";
import {Mouse} from "./components/Mouse";

function App() {

  return (
    <div className="flex flex-col w-screen h-screen">
        <Mouse/>
        <Toolbar/>
        <Canvas/>
    </div>
  )
}

export default App
