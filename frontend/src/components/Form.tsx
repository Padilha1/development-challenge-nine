/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from "@mui/material";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

// let request = {
// 	host: "database-2.cvldcvbrhuyw.us-east-1.rds.amazonaws.com",
// 	method: "GET",
// 	url: "http://database-2.cvldcvbrhuyw.us-east-1.rds.amazonaws.com/",
// 	path: "/",
// };
// let signedRequest = aws4.sign(request, {
// 	// assumes user has authenticated and we have called
// 	// AWS.config.credentials.get to retrieve keys and
// 	// session tokens
// 	secretAccessKey: AWS.config.credentials.secretAccessKey,
// 	accessKeyId: AWS.config.credentials.accessKeyId,
// 	sessionToken: AWS.config.credentials.sessionToken,
// });

// delete signedRequest.headers["Host"];
// delete signedRequest.headers["Content-Length"];

// let response = await axios(signedRequest);
// console.log(response)





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

export const Form = ({ onEdit, setOnEdit, getPatients }: any) => {
	const ref = useRef(getPatients);

	useEffect(() => {
		if (onEdit) {
			const patient = ref.current;
			patient.name.value = onEdit.name;
			patient.email.value = onEdit.email;
			patient.address.value = onEdit.address;
			patient.birthdate.value = onEdit.birthdate;
		}
	}, [onEdit]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const patient = ref.current;
		if (
			!patient.name.value ||
			!patient.email.value ||
			!patient.address.value ||
			!patient.birthdate.value
		) {
			return toast.warn("Fill all the fields!");
		}
		// UPDATE
		if (onEdit) {
			await axios
				.put("http://localhost:30000/" + onEdit.id, {
					name: patient.name?.value,
					email: patient?.email?.value,
					address: patient.address.value,
					birthdate: patient.birthdate.value,
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data));
			// REGISTER
		} else {
			await axios
				.post("http://localhost:30000/", {
					name: patient.name.value,
					email: patient.email.value,
					address: patient.address.value,
					birthdate: patient.birthdate.value,
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data));
		}
		patient.name.value = "";
		patient.email.value = "";
		patient.address.value = "";
		patient.birthdate.value = "";

		setOnEdit(null);
		getPatients();
	};

	return (
		<Container maxWidth="lg">
			<FormContainer ref={ref} onSubmit={handleSubmit}>
				<TextField
					required
					id="outlined-required"
					label="Name"
					variant="outlined"
				/>
				<TextField
					required
					id="outlined-required"
					label="Email"
					variant="outlined"
					type="email"
				/>
				<TextField
					required
					id="outlined-required"
					label="Address"
					variant="outlined"
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
				/>
				<Button variant="outlined" size="large" type="submit">
					{" "}
					Register Patient{" "}
				</Button>
			</FormContainer>
		</Container>
	);
};
