// import { useState } from 'react';
// import {BrowserRouter, Router, Routes} from 'react-router-dom';
// import ElectricalForm from './components/ElectricalForm';

// import './App.css'

// function App() {

//   return (
//     <>
//       <ElectricalForm/>
//     </>
//   )
// }

// export default App


//App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ElectricalForm from './components/ElectricalForm';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ElectricalForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
