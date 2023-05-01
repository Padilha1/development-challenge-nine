/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { FaTrash, FaEdit } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { TableFooter, TablePagination } from "@mui/material";

type Patient = {
	id?: number;
	name: string;
	email: string;
	address: string;
	birthdate: string;
};

type FormProps = {
	patients: Patient[];
	setPatients: Dispatch<SetStateAction<Patient[]>>;
	setIdToEdit: Dispatch<SetStateAction<null>>;
};

export const Grid = (props: FormProps) => {
	const { patients, setPatients, setIdToEdit } = props;

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
			<Table sx={{ minWidth: 600 }} aria-label="simple table">
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
					{patients
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((item, i: number) => (
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
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TableFooter>
				<TableRow>
					<TablePagination
						count={patients.length}
						rowsPerPageOptions={[5, 10, 15]}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						rowsPerPage={rowsPerPage}
						colSpan={3}
					/>
				</TableRow>
			</TableFooter>
		</TableContainer>
	);
};
