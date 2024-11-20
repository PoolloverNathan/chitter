import Theme, { useTheme } from "./Theme"
import { flavors } from "@catppuccin/palette"
import styles from "./styles.css"

export default function App() {
	return <>
		<style>{`
			body {
				display: flex;
			}
		`}</style>
		<div style={{
			flex: "0 1 20em",
			flexDirection: "row",
			resize: "horizontal",
		}}>
			<span>a</span>
			<Sidebar />
		</div>
		<div style={{
			flex: "1 0 50em",
		}}>
			<span>a</span>
			<Chat />
			<Sender />
			<pre>{JSON.stringify(flavors, null, 2)}</pre>
		</div>
	</>
}

function Sidebar() {
	return <>
		<aside>
			{/* TODO */} Sidebar
		</aside>
	</>
}

function Chat() {
	return <>
		<main>
			{/* TODO */} Main
		</main>
	</>
}

function Sender() {
	return <>
		<form>
			<input>
			<button>Send</button>
		</form>
	</>
}
