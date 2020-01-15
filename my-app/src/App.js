import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ApiList from './components/ApiList';

function App() {

  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        console.log(res)
        setList(res.data)
      })
      .catch(err => console.log(err.response));
  }, [setList])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          API
        </p>
          <ApiList list={list} />
      </header>
    </div>
  );
}

export default App;
