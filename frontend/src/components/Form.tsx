import { Button, Container, TextField } from "@mui/material";
import styled from "styled-components";
import { useRef } from "react";

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

export const Form = ({ onEdit: any }) => {
	const ref = useRef();

	return (
		<Container maxWidth="lg">
			<FormContainer ref={ref}>
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
				<Button variant="outlined" size="large" type="submit"> Register Patient </Button>
			</FormContainer>
		</Container>
	);
};
