import React,{useEffect} from 'react'
import styled from 'styled-components'

const MembersDiv = styled.div`
    border: 8px solid green;
    width: 30%;
    margin: 2%;
    padding: 2%;
`
export default function Friends(props) {
    const {members} = props;
    let count = 0;
    useEffect(()=>{
      console.log(members)
    },[members])

    const show = members.map(member => {
        count +=1;
        return(
            <MembersDiv key={count}>
                <p>Name: {member.name}</p>
                <p>Email: {member.email}</p>
                <p>Password: {member.password}</p>
                <p>Signed away all their data?: {member.terms ? 'Yes' :'No' }</p>
            </MembersDiv>
        )
    })
    return show
}