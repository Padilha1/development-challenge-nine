/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaTrash, FaEdit } from "react-icons/fa";

import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Patient = {
	id?: number;
	name: string;
	email: string;
	address: string;
	birthdate: string;
};

type FormProps = {
	patients: Patient[];
	setPatients: Dispatch<SetStateAction<never[]>>;
	setIdToEdit: Dispatch<SetStateAction<null>>;
};

export const Grid = (props: FormProps) => {
	const { patients, setPatients, setIdToEdit } = props;

	const handleEdit = (id: any) => {
		setIdToEdit(id);
	};

	const handleDelete = async (id: any) => {
		await axios
			.delete(`http://localhost:30000/ ${id}`)
			.then(({ data }) => {
				const newArray = patients.filter(
					(patient: Patient) => patient.id !== id
				);
				setPatients(newArray);
				toast.success(data);
			})
			.catch(({ data }) => toast.error(data));

		setIdToEdit(null);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left"> Name</TableCell>
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Address</TableCell>
						<TableCell align="left">Birth Date</TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{patients.map((item, i: number) => (
						<TableRow key={i}>
							<TableCell align="left" size="medium">
								{" "}
								{item.name}{" "}
							</TableCell>
							<TableCell align="left"> {item.email} </TableCell>
							<TableCell align="left"> {item.address} </TableCell>
							<TableCell align="left"> {item.birthdate} </TableCell>
							<TableCell align="right">
								<FaTrash onClick={() => handleDelete(item.id)} />
							</TableCell>
							<TableCell align="right">
								<FaEdit onClick={() => handleEdit(item.id)} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
