import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import Login from "./Pages/Login";
import Index from './Pages/Index';
import Register from "./Pages/Register";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { UserContext } from "./Contexts/UserContext"
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import FindUser from "./Hooks/FindUser";
import Profil from "./Pages/Profil";
import AgencyCreate from './Pages/AgencyCreate';
import AgencyEdit from './Pages/AgencyEdit';
import AgencyView from './Pages/AgencyView';
import ContactCreate from './Pages/ContactCreate';
import ContactEdit from './Pages/ContactEdit';
import ContactView from './Pages/ContactView';
import ProfileEdit from "./Pages/ProfileEdit";

function App() {

    const { user, setUser, isLoading } = FindUser();

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser, isLoading}}>
                    <Navigation />

                    <Switch>
                        <PrivateRoute path="/" exact userType='false' component={Index} />
                        <PublicRoute path="/login" component={Login} />
                        <PublicRoute path="/register" component={Register} />
                        <PrivateRoute path="/profile" exact userType='false' component={Profil} />
                        <PrivateRoute path="/profile/edit"  userType='false' component={ProfileEdit} />
                        <PrivateRoute path="/agencies/create" userType='true' component={AgencyCreate}/>
                        <PrivateRoute path="/agencies/edit/:id" userType='true' component={AgencyEdit}/>
                        <PrivateRoute path="/agencies/view/:id" userType='true' component={AgencyView}/>
                        <PrivateRoute path="/contacts/create/:id" userType='true' component={ContactCreate}/>
                        <PrivateRoute path="/contacts/edit/:id" userType='true' component={ContactEdit}/>
                        <PrivateRoute path="/contacts/view/:id" userType='true' component={ContactView}/>
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
