import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {

  const [users, setUsers] = useState([])
  const getData = async () => {
    const res = await axios.get('/api/users')
    setUsers(res.data)
    // alert('users = '+JSON.stringify(res.data))
    console.log('TJ users = ' + JSON.stringify(res.data))
  }

  useEffect(() => {
    // getData()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <img src={require('./tj_profile.png')} className="App-logo" alt="logo" /> */}
        <img src={require('./jtlogo1024.png')} className="App-logo" alt="logo" />
        {/* <img src={require('./of.jpg')} className="App-logo" alt="logo" /> */}
        <p>
          Raj Edit <code>src/App.js</code> and save to reload.
        </p>


        {/* onMouseOver="this.stop();" onMouseOut="this.start();" */}
        <marquee>
          <h1 style={{ backgroundColor: 'yellow', color: 'black' }}>Tejas patel on react Web now </h1>
        </marquee>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React.js
        </a>
      </header>

      <div style={{ bottom: "-100px", width: "200px" }}>
        <input
          onChange={(val) => {
            debugger;
            console.log('val = ', val)
          }
          } placeholder='enter your name here' color='red' onClick={domagic('red')} onFocus={domagic('blue')} />
      </div>

      <div>
        {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}
      </div>

    </div>
  );
}

// function domagic(color) {
const domagic = (color) => {
  // document.body.style.backgroundColor = "green"
  // alert('called')
  // console.log(color)
  // document.body.style.backgroundColor = color.toString();  
  // color == 'red' ?  document.body.style.backgroundColor = "red" : document.body.style.backgroundColor = "white"
  // document.body.style.backgroundImage = "C:\Projects\MERN\DemoMERN\frontend\src\logo.svg"
}

export default App;
