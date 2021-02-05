import React from 'react';
import ClassComponent from './ClassComponent';
import FunctionalComponent from './FunctionalComponent';

const useFunctional = false;
console.log(`[useFunctional] ${useFunctional}`);
const App = () => {
  return (
    <>
      {useFunctional? <FunctionalComponent/>: <ClassComponent />}
    </>
  )
};

export default App;
