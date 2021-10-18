import React,{ useEffect, useState}  from 'react';
import axios from 'axios';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { connect } from 'react-redux';

const footer = blueGrey[50];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  
  },
});

function SubmittedFormDetails({id}) {
  const classes = useStyles();
  const [details , setDetails] = useState({
    title: "" , description:"" , internal:"" , external:""
  })

  const projectDescription = async () => {
    await axios
      .get(`/student/getformdata/${id}`)
      .then((res) => {
        const {
          project_title,
          internal,
          external,
        } = res.data;

        setDetails({
          title: project_title , 
          description:"Our project is designed to manage different activites conducted during fyp evaluations throughout the year. People engaged during the process like: Students, Internal Advisor, Chairman, Departmental committee; can manage their activities easily." , 
          internal:internal , external:external
        })
      })
      .catch((err) => {
        console.log("FORM DATA ERROR");
      });
  };
  useEffect(() => {
    projectDescription();
  }, []);

  return (
        <>
        <TableBody>
          <TableRow bgcolor={`${footer}`}>
            <TableCell rowSpan={4} />
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>Internal Advisor</TableCell>
            <TableCell align="right" colSpan={2}>{details.internal}</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>External Advisor</TableCell>
            <TableCell align="right" colSpan={2}>{details.external}</TableCell>
          </TableRow>
        </TableBody>
        </>
  );
}
function mapStateToProps({DataRed: {id}}) {
  return {id: id};
}
export default connect(mapStateToProps)(SubmittedFormDetails);