import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app);
const Register = () => {
    /**
     * we can use handle and on change to get data from input
     */
    // const auth=getAuth(app);
    const [error, seterror] = useState('')
    const [success,setsuccess]= useState('')
    const [email,setemail]=useState('');
    const handleemailchange=(event)=>{
        
        console.log(event.target.value);
        setemail(event.target.value) 
    }
    const handlepasswordchange=(event)=>{
        console.log(event.target.value)
    }
    const handlesubmit=(event)=>{
        event.preventDefault();
        setsuccess('');
        seterror('');
        const email=event.target.email.value;
        const password=event.target.password.value;
        const name=event.target.name.value;
        console.log(name, email)
        console.log(password)
        //validate
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            seterror('please add at least one uppercase')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            seterror('please add at least  two numberss')
            return;
        }
        else if(password.length<6){
            seterror('please add at least six characters in your password')
            return;
        }
        //create user in fb
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            seterror('')
            event.target.reset();
            setsuccess('User has created successfully');
            sendemailverification(result.user);
            updateUserData(result.user,name)
        })
        .catch(error=>{
            console.error(error.message)
            seterror(error.message);
            setsuccess('')
        })

    }
    const updateUserData = (user,name)=>{
        updateProfile(user,{
            displayName:name
        })
        .then(()=>{
            console.log('user name updated')
        })
        .catch(error=>{
            seterror(error.message)
        })
    }

    const sendemailverification=(user)=>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
            alert('Please verify your email address')
        })

    }
  return (
    <div>
        <h2>Please Register</h2>
        <form   className='w-50 mx-auto' onSubmit={handlesubmit} >
            <input className='mb-3'  type="text"  name='name' id='name' placeholder='Enter Your Name' required/> <br></br>
            <input className='mb-3' onChange={handleemailchange} type="email"  name='email' id='email' placeholder='Enter Your Email' required/> <br></br>
            <input className='mb-3' onBlur={handlepasswordchange} type="password"  name='password' id='password' placeholder='Enter Your Password' required/> <br></br>
            <input className='btn btn-primary' type="submit"  name='submit' id='submit' value="Register"/> <br></br>
        </form>
        
        <p><small>You have a old account ? <Link to="/login">Login</Link></small></p>
        <p className='text-danger'>{error}</p>
        <p className='text-primary'>{success}</p>
    </div>
    
  )
}
export default Register