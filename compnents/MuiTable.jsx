import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { DELETE_REGION } from '../graphQL/mutation/RegionMutation';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function BasicTable({ columnHeaders, dataList }) {
   const deleteRegion=(id)=>{
    console.log("id",id)
              if(id && id?.length>0){
                  try{
                      CallApi("mutation", DELETE_REGION, {id:id})
                      .then((res)=>res)
                      .then((res)=>{
                          if(res){
                            console.log("res",res)
                              router.push("/regions");
                              console.log("Region deleted successfully:", res.data.deleteRegion);
                          }
                      }).catch
                      (error=>{
                          console.log("eror while deleting",error)
                      })
                  }
                  catch{
                      console.log("erro while deleting")
                  }
              }
          }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnHeaders.map((column) => (
              <TableCell key={column.id}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row, idx) => (
            <TableRow key={row.id || idx}>
              {columnHeaders.map((column) => (
                <TableCell key={column.id} align="left">
                  {row[column.id]}
                </TableCell>
              ))}
              <TableCell>
                <Button variant='contained' color='primary' href={`/regions/addEditRegions/${row.id}`}>Edit</Button>
                <Button sx ={{marginLeft:"3px"}} variant='outlined' color='warning' onClick={()=>deleteRegion(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
