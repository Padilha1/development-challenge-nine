/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaTrash, FaEdit } from "react-icons/fa";

import { Key } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Grid = ({ patients, setPatients, setIdToEdit }: any) => {
	const handleEdit = (id: any) => {
		setIdToEdit(id);
	};

	const handleDelete = async (id: any) => {
		await axios
			.delete("http://localhost:30000/" + id)
			.then(({ data }) => {
				const newArray = patients.filter((patient: any) => patient.id !== id);

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
						<TableCell align="right"> Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Address</TableCell>
						<TableCell align="right">Birth Date</TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{patients.map((item: any, i: Key | null | undefined) => (
						<TableRow key={i}>
							<TableCell align="right" size="medium">
								{" "}
								{item.name}{" "}
							</TableCell>
							<TableCell align="right"> {item.email} </TableCell>
							<TableCell align="right"> {item.address} </TableCell>
							<TableCell align="right"> {item.birthdate} </TableCell>
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
