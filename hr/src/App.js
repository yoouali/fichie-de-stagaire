import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/HOME';
import Login from './components/Authentications/login';
import Setting from './components/Setting';
import StagiaireList from './components/StagiaireList';
import EntrepreneurList from './components/EntrepreneurList';
import StagiaireComp from './components/StagiareComp';
import EntrepreneurComp from './components/EntrepreneurComp';
import UserComp from './components/UserComp';
import UserList from './components/UserList';
import EntrepreneurUpdate from './components/entrepreneurUpdate.js';

import './style.css';

function App() {
  return(
    <div className="App">
      <BrowserRouter>
      <Route exact path="/"> <Home /></Route>
      <Route exact path="/login"> <Login /></Route>
      <Route exact path="/setting"> <Setting /></Route>
      <Route exact path="/Stagiairelist"> <StagiaireList /></Route>
      <Route exact path="/Entrepreneurlist"> <EntrepreneurList /></Route>
      <Route exact path="/Userlist"> <UserList /></Route>
      <Route exact path="/Stagiaire/:id"> <StagiaireComp/></Route>
      <Route exact path="/Entrepreneur/:id"> <EntrepreneurComp/></Route>
      <Route exact path="/user/:id"> <UserComp/></Route>
      <Route exact path="/Entrepreneurupdate/:id"> <EntrepreneurUpdate/></Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
