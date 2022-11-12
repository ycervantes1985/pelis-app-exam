import React from 'react';
import {useUser} from "../contexts/userContext"
import logout from '../services/logout';
import Detail from './Detail';
import Button from 'react-bootstrap/Button';



const Main = () => {

    const {user,setUser} = useUser();

    const renderInfo=()=>{
        if(user){
            return (<div className='user-log'>({user.firstName} {user.lastName})</div>)
        }else{
            return(<div className='user-log'>()</div>)
        }
    }

    const logOut = async() => {
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No se pude desloguear")
    }


    return (
        <div>
            <h2>{renderInfo()} </h2>
            {user && <Button className="logout-button" variant="link" onClick={logOut}>LOGOUT</Button>}
            {user && <Detail></Detail> }
        </div>
    );
}

export default Main;
