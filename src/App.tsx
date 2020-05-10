import React, { useEffect, useState } from 'react';
import EditorComponent from './components/editor-component/editorComponent';
import ListComponent from './components/list-component/listComponent';
import './App.css';
import { communicationService } from './shared/services/communication.service';
import { Todo } from './shared/models/todo.model';

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
