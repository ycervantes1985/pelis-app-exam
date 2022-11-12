import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { simplePost } from '../services/simplePost';
import {useUser} from "../contexts/userContext"
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';

const Login = () => {

    const [errors,setErrors] = useState([])
    const navigate=useNavigate();
    const {setUser} = useUser();

    const loginUsuario = async(values) => {
        const response = await simplePost("http://localhost:8000/api/login",values)

        if(response.data.message===""){
            console.log("USUARIO LOGUEADO",response.data)
            const response2 = await simpleGetAuthenticated(`http://localhost:8000/api/user/${response.data._id}`)
            setUser(response2.data);
            navigate("/")
        }else{
            const errorResponse = response.data.errors; 
            const errorArr = []; 
            for (const key of Object.keys(errorResponse)) { 
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        }
    }


    return (
        <div>
            {errors.map((err, index) => <div className={`alert alert-danger`} role="alert" key={index}>{err}</div>)}
            <LoginForm onSubmitProp={loginUsuario} ></LoginForm>
        </div>
    );
}

export default Login;
