import { useState } from 'react';
import './App.css';
import Dashboard from "./Components/Dashboard.jsx"
import States from "./Components/States.jsx"
import { Button,Heading,
  } from '@chakra-ui/react'

function App() {
  let [state,setState]=useState(true)

  return (
    <div className="App">
      <Heading>Admin Dashboard</Heading>
      <Button onClick={()=>setState(true)}>Dashboard</Button>
      <Button onClick={()=>setState(false)}>States</Button>
      {state? <Dashboard/>:
      <States/>}
    </div>
  );
}

export default App;
