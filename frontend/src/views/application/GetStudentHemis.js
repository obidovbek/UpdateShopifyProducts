import React, {useState} from 'react';
import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
  } from '@coreui/react'
import httpService from 'src/services/HttpService'

const GetStudentHemis = (props) => {
    const [studentCred, setstudentCred] = useState({passport_pin: '', passport_number: '',});
    const { callback } = props;

    const searchStudent = async (event) => {
        event.preventDefault();
        try{
          const st = await httpService.getStudent(studentCred);
          callback(st);
        }catch(err){alert(err)}
    }
    return (
        <CForm onSubmit={searchStudent} style={{marginBottom: '20px'}}> 
        <div className="mb-3">
          <CFormLabel htmlFor="statementFormControlInput1">PINFL</CFormLabel>
          <CFormInput
            type="text"
            name="passport_pin"
            value={studentCred.passport_pin}
            onChange={(e) => setstudentCred({ ...studentCred, passport_pin: e.target.value })}
            id="statementFormControlInput1"
            placeholder="PINFL"
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="statementFormControlInput2">Passport Shifri va raqami</CFormLabel>
          <CFormInput
            type="text"
            name="passport_number"
            value={studentCred.passport_number}
            onChange={(e) => setstudentCred({ ...studentCred, passport_number: e.target.value })}
            id="statementFormControlInput2"
            placeholder="Passport shifri va raqami"
          />
        </div>
        {/* <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
          <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
        </div> */}
        <CButton
          type="submit"
          color={"primary"}
          style={{textAlign: 'center', marginRight: '10px'}}
        >
          Talabani qidirish
        </CButton>
      </CForm>
    );
}
export default GetStudentHemis;