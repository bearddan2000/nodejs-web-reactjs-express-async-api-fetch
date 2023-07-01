import './App.css';
import React, { useEffect, useState } from 'react';
import Datarow from './component/Datarow';

function App() {
  
  const [users, setUsers] = useState([]);

/* Define async function */
const getData = async () => {

    /* This try block will encapsulate the fetch logic, and capture all errors
       that can be thrown */
    try {
        
        var url = 'http://localhost:81/'
        
        /* Use await instead of promise.then */
        const response = await fetch(url)

        /* The json() function is async, so use await */
        const json = await response.json()

        /* If response failed, return error data in same format as in your 
           Promise.reject() */
        if(!response.ok) {
            // throw { status: response.status, fullError: json } 
            console.log("response not ok")
        }

        /* Update data with json */
        setUsers(json)
    }
    catch(error) {

        /* Log error to console */
        console.error(error)
    }
}

  useEffect(() => {
    getData()
  }, []);
  
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Async fetched api json</h1>
        {users.map(({ breed, color, id}) =>
        (
         <Datarow dataFieldId={id} dataFieldBreed={breed} dataFieldColor={color}/>
        ))}
      </header>
    </div>
  );
}

export default App;

