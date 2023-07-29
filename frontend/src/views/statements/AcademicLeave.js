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
import moment from 'moment';

const AcademicLeave = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const today = Moment().format('DD.MM.YYYY')

  const [additionData, setAdditionData] = useState({
    start: '',
    end: '',
    reason: '',
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
  const formatDate = (d) => {
    const date = moment(d)
    return date.format('DD.MM.YYYY')
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
                            <CFormLabel htmlFor="statementFormControlInput3">Boshlanishi</CFormLabel>
                            <CFormInput
                            type="date"
                            format='dd/mm/yyyy'
                            name="Start"
                            value={additionData.start}
                            onChange={(e) => setAdditionData({ ...additionData, start: formatDate(e.target.value) })}
                            id="statementFormControlInput3"
                            placeholder="Boshlanishi"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="statementFormControlInput4">Tugashi</CFormLabel>
                            <CFormInput
                            type="date"
                            name="end"
                            value={additionData.end}
                            onChange={(e) => setAdditionData({ ...additionData, end: formatDate(e.target.value) })}
                            id="statementFormControlInput4"
                            placeholder="Tugashi"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="statementFormControlInput5">Sababi</CFormLabel>
                            <CFormInput
                            type="text"
                            name="reason"
                            value={additionData.reason}
                            onChange={(e) => setAdditionData({ ...additionData, reason: e.target.value })}
                            id="statementFormControlInput5"
                            placeholder="Sababi"
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
                <p style={{paddingBottom: '20px', textAlign: 'justify'}}>
                &nbsp;&nbsp;&nbsp;Arizamni qisqacha mazmuni shundan iboratki, meni sog‘ligim yomonlashganligi sababli “O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 3-iyundagi 344-sonli qarori bilan tasdiqlangan “Oliy ta’lim muassasalari talabalariga akademik ta’til berish to‘g‘risida”gi Nizomga asosan menga <strong>{additionData.start ? additionData.start: '____'}</strong> yildan <strong>{additionData.end ? additionData.end: '____'}</strong> yilgacha {additionData.reason ? additionData.reason: '____'} akademik ta’til berishingizni so‘rayman.
                </p>
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

export default AcademicLeave
