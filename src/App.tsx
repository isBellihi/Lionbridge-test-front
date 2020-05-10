import React from 'react';
import EditorComponent from './components/editor-component/editorComponent';
import ListComponent from './components/list-component/listComponent';
import './App.css';

const App : React.FunctionComponent<{}>  = () => {

  return (
  <div className="container">
    <h1>Lionbridge full stack test!</h1>
    <EditorComponent/>
    <ListComponent/>
  </div>
  );
}

export default App;
