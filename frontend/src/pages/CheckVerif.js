import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { VerifValidation } from '../redux/actions/authActions'
import { useDispatch } from 'react-redux'

function CheckVerif() {
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const id  = searchParams.get('id');
    const token  = searchParams.get('token');
    console.log(id,token,)
    dispatch(VerifValidation(id,token,navigate));
    return ;
}

export default CheckVerif