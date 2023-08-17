import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {resetContext} from "kea";
import {subscriptionsPlugin} from "kea-subscriptions";

resetContext({
    plugins: [subscriptionsPlugin],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
