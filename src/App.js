import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Cases from "./components/Cases";
import Contacts from "./components/Contacts";
import Header from "./components/Header";
import Home from "./components/Home";
import Services from "./components/Services";
import GlobalStyles from "./styles/global";

function App() {
	return <BrowserRouter>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cases" element={<Cases />} />
			<Route path="/about" element={<About />} />
			<Route path="/services" element={<Services />} />
			<Route path="/contacts" element={<Contacts />} />
		</Routes>
		<GlobalStyles />
	</BrowserRouter>
}

export default App;