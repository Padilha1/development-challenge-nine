import "react-toastify/ReactToastify.css";
import "./styles/index.css";

import styled from "styled-components";
import axios from "axios";

import { Form } from "./components/Form";
import { toast, ToastContainer } from "react-toastify";
import { Grid } from "./components/Grid";
import { useEffect, useState } from "react";

const Title = styled.h2``;

function App() {
	const [patients, setPatients] = useState([]);
	const [onEdit, setOnEdit] = useState(null);

	const getPatients = async () => {
		try {
			const res = await axios.get(
				"http://localhost:30000/"
			);
			setPatients(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPatients();
	}, [setPatients]);

	return (
		<>
			<Title> Patients </Title>
			<Form onEdit={onEdit} setOnEdit={setOnEdit} getPatients={getPatients} />
			<Grid
				patients={patients}
				setPatients={setPatients}
				setOnEdit={setOnEdit}
			/>
			<ToastContainer autoClose={4000} position={toast.POSITION.TOP_RIGHT} />
		</>
	);
}

export default App;
