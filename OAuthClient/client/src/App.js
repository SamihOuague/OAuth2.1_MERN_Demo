import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Auth from "./app/Auth/Auth";
import './App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/*" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
