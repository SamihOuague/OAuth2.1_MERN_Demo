import { Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import './App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
