import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {resetContext} from "kea";
import {loadersPlugin} from "kea-loaders";

resetContext({
    plugins: [loadersPlugin]
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
