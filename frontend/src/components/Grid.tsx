// import styled from "styled-components";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

// const Table = styled.table`
//     width: 100%;
//     padding: 1em;
//     box-shadow: 0 0 5px #000;
//     border-radius: 5px;
//     max-width: 800px;
//     margin: 1em auto;
//     word-break: break-all;
// `
// const Tr = styled.tr``;

// const Th = styled.th`
//   text-align: start;
//   border-bottom: inset;
//   padding-bottom: 5px;
// `


export const Grid = ({ patients }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell align="right"> Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Address</TableCell>
						<TableCell align="right">Birth Date</TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{patients.map((item, i) => (
						<TableRow key={i}>
							<TableCell align="right" size="medium"> {item.name} </TableCell>
							<TableCell align="right"> {item.email} </TableCell>
							<TableCell align="right"> {item.address} </TableCell>
							<TableCell align="right"> {item.birthdate} </TableCell>
							<TableCell align="right"> 
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton> 
                            </TableCell>
							<TableCell align="right">  </TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
