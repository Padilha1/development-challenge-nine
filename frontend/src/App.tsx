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
				"local"
			);
			setPatients(res.data);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		getPatients();
	}, [setPatients]);

	return (
		<>
			<Title> Patients </Title>
			<Form />
			<Grid patients={patients} />
			<ToastContainer autoClose={4000} position={toast.POSITION.TOP_RIGHT} />
		</>
	);
}

export default App;
