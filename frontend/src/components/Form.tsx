/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-wrap: wrap;

	gap: 10px;
	padding: 1.2em;
	margin-bottom: 2em;

	box-shadow: 0 0 5px #000;
	border-radius: 5px;
`;

type Patient = {
	id?: number;
	name: string;
	email: string;
	address: string;
	birthdate: string;
};

type FormProps = {
	patients: Patient[];
	idToEdit?: number | null;
	getPatients: () => void;
	setIdToEdit: Dispatch<SetStateAction<null>>;
};

export const Form = (props: FormProps) => {
	const { patients, idToEdit, getPatients, setIdToEdit } = props;
	const [patientData, setPatientData] = useState({
		name: "",
		email: "",
		address: "",
		birthdate: "",
	});

	useEffect(() => {
		const patientToEdit = patients.find((patient: Patient) => patient.id == idToEdit);
		if (patientToEdit) {
			setPatientData({ ...patientToEdit });
		}
	}, [patients, idToEdit]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (idToEdit) {
				await axios
					.put("http://localhost:30000/" + idToEdit, patientData)
					.then(({ data }) => toast.success(data))
					.catch(({ data }) => toast.error(data));
			} else {
				await axios
					.post("http://localhost:30000/", patientData)
					.then(({ data }) => toast.success(data))
					.catch(({ data }) => toast.error(data));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIdToEdit(null); //se nao fosse null, iria sobrescrever o paciente editado anteriormente
			getPatients();
		}
	};

	return (
		<Container maxWidth="lg">
			<FormContainer onSubmit={handleSubmit}>
				<TextField
					required
					id="outlined-required"
					label="Name"
					variant="outlined"
					onChange={(e) =>
						setPatientData({ ...patientData, name: e.target.value })
					}
					value={patientData.name || ""}
				/>
				<TextField
					required
					id="outlined-required"
					label="Email"
					variant="outlined"
					type="email"
					onChange={(e) =>
						setPatientData({ ...patientData, email: e.target.value })
					}
					value={patientData.email || ""}
				/>
				<TextField
					required
					id="outlined-required"
					label="Address"
					variant="outlined"
					onChange={(e) =>
						setPatientData({ ...patientData, address: e.target.value })
					}
					value={patientData.address || ""}
				/>
				<TextField
					required
					id="outlined-required"
					label="Birth Date"
					variant="outlined"
					InputLabelProps={{
						shrink: true,
					}}
					type="date"
					onChange={(e) =>
						setPatientData({ ...patientData, birthdate: e.target.value })
					}
					value={patientData.birthdate || ""}
				/>
				<Button variant="outlined" size="large" type="submit">
					{" "}
					Register Patient{" "}
				</Button>
			</FormContainer>
		</Container>
	);
};
