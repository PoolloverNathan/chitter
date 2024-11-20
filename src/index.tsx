import App from "./App.tsx"
import { createRoot } from "react-dom"

const root = createRoot(document.body)
window.onerror = (a, b, c, d, e) => {
	root.render(<pre>{e.stack}</pre>)
}
root.render(<App />)
