import "react-toastify/ReactToastify.css";
import "./styles/index.css";

import styled from "styled-components";
import axios from "axios";

import { Form } from "./components/Form";
import { toast, ToastContainer } from "react-toastify";
import { Grid } from "./components/Grid";
import { useEffect, useState } from "react";

const Logo = styled.img`
	margin-top: 2rem;
	width: 100px;
`;
const Title = styled.h2``;

type Patient = {
	id?: number;
	name: string;
	email: string;
	address: string;
	birthdate: string;
};

function App() {
	const [patients, setPatients] = useState<Patient[] | []>([]);
	const [idToEdit, setIdToEdit] = useState(null);

	const getPatients = async () => {
		try {
			const res = await axios.get("http://localhost:30000/");
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
			<Logo src="./logoDark.png" />
			<Title> Medcloud Patients </Title>
			<Form
				patients={patients}
				getPatients={getPatients}
				idToEdit={idToEdit}
				setIdToEdit={setIdToEdit}
			/>
			<Grid
				patients={patients}
				setPatients={setPatients}
				setIdToEdit={setIdToEdit}
			/>
			<ToastContainer autoClose={4000} position={toast.POSITION.TOP_RIGHT} />
		</>
	);
}

export default App;
