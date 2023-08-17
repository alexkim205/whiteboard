import {Toolbar} from "./components/Toolbar";
import {Canvas} from "./canvas/Canvas";
import {Mouse} from "./components/Mouse";

function App() {

  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden">
        <Mouse/>
        <Toolbar/>
        <Canvas/>
    </div>
  )
}

export default App
