import React ,{useState , useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {red} from "@material-ui/core/colors";

const body = grey[100];
const leaderStatus = red[100];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    
  },
});

function createRow(name, seatno, email, status1) {
  return { name, seatno, email, status1 };
}

function SubmittedFormDetails({id}) {
  // console.log("ID StudDetail => ",id);
  const classes = useStyles();
  const [ statusColor , setStatusColor ] = useState(0);
  const [ mem1 , setMem1 ] = useState({
    seatno: "", name:"" , email:"" , status:""
  });
  const [ mem2 , setMem2 ] = useState({
    seatno: "", name:"" , email:"" , status:""
  });
  const [ mem3 , setMem3 ] = useState({
    seatno: "", name:"" , email:"" , status:""
  });
  
  //************STUDENT GROUP DETAILS FROM API************/
  const groupData = async () => {
    await axios
      .get(`/student/getformdata/${id}`)
      .then((res) => {
        console.log("API RESPONSE: ",res);
        console.log("STUDENT DETAILS API WORKING: ",id);
        // Member 1 details from api
        const mem1SeatNo = res.data.student[0].seatno;
        const mem1Name = res.data.student[0].name;
        const mem1Email = res.data.student[0].email;
        const mem1Status = res.data.student[0].status;
        
        // Set Member 1 details in State
        setMem1({
          seatno: mem1SeatNo, name: mem1Name , email:mem1Email , status:mem1Status
        })

        // Member 2 details from api
        const mem2SeatNo = res.data.student[1].seatno;
        const mem2Name = res.data.student[1].name;
        const mem2Email = res.data.student[1].email;
        const mem2Status = res.data.student[1].status;
        // Set Member 2 details in State
        setMem2({
          seatno: mem2SeatNo, name: mem2Name , email:mem2Email , status:mem2Status
        })

        if (res.data.student.length > 2){
          const mem3SeatNo = res.data.student[2].seatno;
          const mem3Name = res.data.student[2].name;
          const mem3Email = res.data.student[2].email;
          const mem3Status = res.data.student[2].status;
          // Set Member 3 details in State
        setMem3({
          seatno: mem3SeatNo, name: mem3Name , email:mem3Email , status:mem3Status
        })
        }

        // console.log("MEMBER 1 DETAILS: ",mem1);
        // console.log("MEMBER 2 DETAILS: ",mem2);
        // console.log("MEMBER 3 DETAILS: ",mem3);
        
        
        // ********************************DISPATCHING ACTION IN CASE OF LOGIN SUCCESS****************/
        // dispatch({
        //   type: FORM_DATA,
        //   payload: {
        //     // mem2,
        //     // project_title,
        //     // internal,
        //     // external
        //   },
        // });
         
      })
      .catch((err) => {
        console.log("FORM DATA ERROR,HERE");
        console.log(err);
      });
  };
  useEffect(() => {
    groupData();
  }, []);

  // console.log("MEMBER 1 DETAILS: ",mem1)
  console.log("MEMBER 1 DETAILS: ",mem1);
  console.log("MEMBER 2 DETAILS: ",mem2);
  console.log("MEMBER 3 DETAILS: ",mem3);
  
  const rows = [
    createRow(mem1.name, mem1.seatno, mem1.email,'Leader'),
    createRow(mem2.name, mem2.seatno, mem2.email,mem2.status),
    createRow(mem3.name, mem3.seatno, mem3.email,mem3.status),
  ];
  
  return (
        <TableBody>
              {rows.map((row) => (
                <>
                  {
                    row.status1 === "Leader" ? (
                      <>
                      <TableRow bgcolor={`${leaderStatus}`} key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right" colSpan={2}>{row.seatno}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="right">{row.status1}</TableCell>
                      </TableRow>
                      </>
                    ) : (
                      <>
                      <TableRow bgcolor={`${body}`} key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right" colSpan={2}>{row.seatno}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="right">{row.status1}</TableCell>
                      </TableRow>
                      </>
                    )
                  }
                  </>
              ))}
          
        </TableBody>
  );
}
function mapStateToProps({DataRed: {id}}) {
  return {id: id};
}
export default connect(mapStateToProps)(SubmittedFormDetails);