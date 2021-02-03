import React from 'react';
import ClassComponent from './ClassComponent';
import FunctionalComponent from './FunctionalComponent';

const useFunctional = true;
const App = () => {
  return (
    <>
      {useFunctional? <FunctionalComponent/>: <ClassComponent />}
    </>
  )
};

export default App;
