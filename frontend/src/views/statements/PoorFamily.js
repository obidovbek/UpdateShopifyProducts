import React, {useState, useRef} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import GetStudentHemis from './GetStudentHemis';

const PoorFamily = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const today = Moment().format('DD.MM.YYYY')

  const [additionData, setAdditionData] = useState({
    mfy: '',
  });
  

  const [student, setStudent] = useState(null);


  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => (word === 'o‘g‘li' || word === 'qizi') ? (word) : (word.charAt(0).toUpperCase() + word.slice(1)))
      .join(' ');
  };
  const getStudent = async (st) =>{
    await setStudent(st);
  }
  return (
      <div class="cr-app-wrap">
        <div class="cr-app-wrap-1">
              <CCard className="mb-4" style={{ width:'100%'}}>
                {/* <CCardHeader>
                  <strong>Ariza yaratish</strong>
                </CCardHeader> */}
                <CCardBody>
                    <GetStudentHemis callback={getStudent} />
                    {student && 
                    (<CForm> 
                        <CButton
                            color={"primary"}
                            style={{textAlign: 'center', width: '100%', marginBottom: '10px'}}
                            onClick={handlePrint}
                        >
                            Print
                        </CButton>
                        <div className="mb-3">
                            <CFormLabel htmlFor="statementFormControlInput3">MFY</CFormLabel>
                            <CFormInput
                            type="text"
                            name="mfy"
                            value={additionData.mfy}
                            onChange={(e) => setAdditionData({ ...additionData, mfy: e.target.value })}
                            id="statementFormControlInput3"
                            placeholder="MFY"
                            />
                        </div>
                    </CForm>)
                    }
                </CCardBody>
              </CCard>
        </div>
        <div class="cr-app-wrap-2">
          <div class="page4 size"  ref={componentRef}>
            { student && 
              (<div>
                <div style={{ display: 'flex',justifyContent: 'end', paddingBottom: '20px'}}>
                  <div style={{textAlign: 'left', width: '285px',}}>
                    Farg‘ona politexnika instituti rektori O‘.R.Salomovga &nbsp;
                    {student.department.name} &nbsp;
                    {student.group.name} guruhi talabasi &nbsp; 
                    {capitalizeWords(student.full_name)}dan
                  </div>
                </div>
                <div style={{textAlign: 'center', fontWeight: 'bold', paddingBottom: '5px'}}>Ariza</div>
                <div style={{paddingBottom: '20px', textAlign: 'justify'}}>
                    &nbsp;&nbsp;&nbsp;Arizamning qisqacha mazmuni shundan iboratki, {additionData.mfy ? additionData.mfy: '____'}  MFY tomonidan “ijtimoiy himoya yagona reestri” axborot tizimi orqali kam ta’minlangan deb e’tirof etilganmiz. Men va oila a’zolarim (“Ayollar yoki yoshlar daftari”)ga kiritilganmiz. Shu sababli talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '20px'}}>
                  <div><div style={{marginBottom: '-5px'}}>_________</div><div style={{fontSize: '12px', paddingLeft: '25px'}}>(imzo)</div></div>  
                  <div>{capitalizeWords(student.short_name)}</div>  
                  <div>{today}</div>  
                </div>
              </div>)
            }
          </div> 
        </div>
      </div>
  )
}

export default PoorFamily
