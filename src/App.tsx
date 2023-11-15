import {useState} from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Box,Button,Table,TableContainer,TableHead,TableRow,TableCell,Typography, TableBody } from '@mui/material';

interface props {
  id:number;
  index:number;
  time:string;
}


function App(){
  
  const [toggle,isToggle]=useState<boolean>(true);
  
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset
  } = useStopwatch({ autoStart: false });

  const[items,setItems]=useState<props[]>([])

  const addList=() =>{
    const id=items.length ? items[items.length-1].id + 1 :1
    const index=items.length ? items[items.length-1].index + 1 :1
    const time=`${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds <10 ? `0${seconds}` : seconds}`
    const newItem={id,index,time}
    const listItems=[...items,newItem]
    
    // Removind duplicates
    let newArray:props[] = [];
    let uniqueObject:{[key: string]:props}= {};

    for(let i in listItems){
      let unique=listItems[i]['time']
      uniqueObject[unique]=listItems[i]
    }

    for(let i in uniqueObject){
      newArray.push(uniqueObject[i]);
    }
    // 
  
    if(time!=="00:00:00"){
      setItems(newArray) 
    }
  }

  const removeList=()=>{
    setItems([])
  }
 
  
  return (
    <>
     <Typography variant='h1' component='p' align='center' gutterBottom={true} sx={{marginTop:"10px"}}>
       {hours<10 ? `0${hours}` : hours}:
       {minutes<10 ? `0${minutes}` : minutes}:
       {seconds <10 ? `0${seconds}` : seconds}
     </Typography>
     <Box sx={{display:"flex",justifyContent:"center",gap:"10px",marginBottom:"50px"}} >
        <Button variant="outlined" color="primary" onClick={()=>addList()}>Lap</Button>
        {toggle ? 
        <Button variant="outlined" color="success" onClick={()=>{start();isToggle(false)}}>Start</Button>
        :
        <Button variant="outlined" color="error" onClick={()=>{pause();isToggle(true)}}>Stop</Button>
        }
        <Button variant="outlined" color="warning" onClick={()=>{reset();removeList()}}>Reset</Button>   
     </Box>
     {items.length > 0 ?
     <TableContainer >
        <Table sx={{ width: "50%" }} align="center" aria-label="spanning table">
          <TableHead>
            <TableRow>
                <TableCell align="left" >No:</TableCell>
                <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {items.map((item)=>(
              <TableRow key={item.id}>
                <TableCell>{item.index}</TableCell>
                <TableCell align="right">{item.time}</TableCell>
              </TableRow>
             ))}
          </TableBody>
        </Table>
     </TableContainer> : null}
    </>
  );

}

export default App;

