import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import Form from './components/Form'
import Friends from './components/Friends'
import formSchema from './validation/formSchema'

// initial states

const initialValues = {
  //text inputs
  name:'',
  email:'',
  password:'',
  //checkbox
  terms:false,
}

const initialErrors ={
  name:'',
  email:'',
  password:'',
}

//for posting new members
const initialMembers =[]

// for submit button
const initialDisabled = false


function App() {

  //states

  const [members,setMembers] = useState(initialMembers);
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [disabled,setDisabled] = useState(initialDisabled)

  // helper functions

  const change = evt => {
    evt.preventDefault()
    const {name,value,checked,type} = evt.target;
    const valueToUse = type ==='checkbox' ? checked : value;
    inputChange(name,valueToUse)
  };

//event handlers

// POSTing new members
  const postMember = newMember => {
    axios
    .post('https://reqres.in/api/users', newMember)
    .then(res => {
      setMembers([res.data, ...members])
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    setFormValues(initialValues)
  }

//validation
  const inputChange =(name,value) =>{
    yup.reach(formSchema, name) // reaching into schema and testing each input
    .validate(value)
    .then(()=>{
      setFormErrors({
        ...formErrors,
        [name]:''
      })
    })
    //if validation is unsuccessful respond with error messages from schema
    .catch(err => {
      setFormErrors({
        ...formErrors,
        //validation error from schema
         [name]: err.errors[0]
        });
    });

    setFormValues({
      ...formValues,
      [name]:value
    });
  };

  //submit function
  const formSubmit =() =>{
      const newMember ={
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          password: formValues.password.trim(),
          terms: formValues.terms,
      }
      postMember(newMember)// posting a new member
      setMembers(members.concat(newMember))
    }

  // everytime the form value state is updated, this will check to see if we can enable/disable the submit button
  useEffect(() => {
      formSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

  return (
    <div className="container">
      <header>
        <h1>This Form is for New Members</h1>
      </header>

      <Form
        values={formValues}
        change={change}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <Friends
        members={members}
      />
    </div>
  );
}

export default App;