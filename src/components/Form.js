import React from 'react';
import styled from 'styled-components'

const StyleForm = styled.form`
display:flex;
justify-content:center;
flex-direction:column;
border:1px solid black;
padding: 3%;
label{
    padding: 2%;
}
input{
    margin:2%;
}
button{
    display:flex;
    justify-content:center;
    width: 40%;
    background-color: green;
    :disabled{
        background-color:crimson;
    }
}
`

export default function Form(props){
    const  {values, change, submit,disabled,errors} = props;
    const onSubmit = evt =>{
        evt.preventDefault()
        submit()
    }

    return (
        <StyleForm onSubmit={onSubmit}>
            <h2>Welcome to my App!</h2>
        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
            <label> Enter your name:
           <input name='name' type='text' value={values.name} placeholder="Full Name" onChange={change}/>
            </label>

            <label> Enter your email:
           <input name='email' type='email' value={values.email} placeholder="Email" onChange={change}/>
            </label>

            <label> Enter your password:
           <input name='password' type='password' value={values.password} placeholder="Password" onChange={change}/>
            </label>

            <label> Please sign away all your data:
           <input name='terms' type='checkbox' checked={values.terms} onChange={change}/>
            </label>

            <button id={'submitButton'} disabled={disabled}>Submit</button>
        </StyleForm>
    )
}