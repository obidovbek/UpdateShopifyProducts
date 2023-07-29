import React, {useState, useRef} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CDatePicker,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DocsExample } from 'src/components'
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
// import ttj from './statements/ttj';
import GetStudentHemis from './GetStudentHemis';

const Anketa = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const today = Moment().format('DD.MM.YYYY')

  const [additionData, setAdditionData] = useState({
    mfy: '',
    street: '',
    home_number: '',
    stir: '',
    dateOfBirth: null,
    identi_number: '',
    mfyAcc: '',
    streetAcc: '',
    home_numberAcc: '',
    price: '',
    home_phone: '',
    mobile_phone: '',
    email: '',
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
    console.log(st)
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
                    <GetStudentHemis callback={getStudent}  />
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
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput4">Ko'chasi</CFormLabel>
                        <CFormInput
                          type="text"
                          name="street"
                          value={additionData.street}
                          onChange={(e) => setAdditionData({ ...additionData, street: e.target.value })}
                          id="statementFormControlInput4"
                          placeholder="Ko'chasi"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput5">Uy raqami</CFormLabel>
                        <CFormInput
                          type="text"
                          name="home_number"
                          value={additionData.home_number}
                          onChange={(e) => setAdditionData({ ...additionData, home_number: e.target.value })}
                          id="statementFormControlInput5"
                          placeholder="Uy raqami"
                        />
                      </div>
                      <div>
                        <CFormLabel htmlFor="statementFormControlInput6">Tug‘ilgan sanasi </CFormLabel>
                        <div class="date-picker">
                            <DatePicker
                                selected={additionData.dateOfBirth}
                                onChange={async (e) => setAdditionData({ ...additionData, dateOfBirth: e })}
                                id="statementFormControlInput6"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput7">STIR</CFormLabel>
                        <CFormInput
                          type="text"
                          name="stir"
                          value={additionData.stir}
                          onChange={(e) => setAdditionData({ ...additionData, stir: e.target.value })}
                          id="statementFormControlInput7"
                          placeholder="STIR"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput8">Jismoniy shaxsning shaxsiy idenfikatsiya raqami: </CFormLabel>
                        <CFormInput
                          type="text"
                          name="identi_number"
                          value={additionData.identi_number}
                          onChange={(e) => setAdditionData({ ...additionData, identi_number: e.target.value })}
                          id="statementFormControlInput8"
                          placeholder="Jismoniy shaxsning shaxsiy idenfikatsiya raqami"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput9">Yangi turar joy MFY</CFormLabel>
                        <CFormInput
                          type="text"
                          name="mfyAcc"
                          value={additionData.mfyAcc}
                          onChange={(e) => setAdditionData({ ...additionData, mfyAcc: e.target.value })}
                          id="statementFormControlInput9"
                          placeholder="Yangi turar joy MFY"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput10">Yangi turar joy  ko'chasi</CFormLabel>
                        <CFormInput
                          type="text"
                          name="streetAcc"
                          value={additionData.streetAcc}
                          onChange={(e) => setAdditionData({ ...additionData, streetAcc: e.target.value })}
                          id="statementFormControlInput10"
                          placeholder="Yangi turar joy  ko'chasi"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput11">Yangi turar joy  uy raqami</CFormLabel>
                        <CFormInput
                          type="text"
                          name="home_numberAcc"
                          value={additionData.home_numberAcc}
                          onChange={(e) => setAdditionData({ ...additionData, home_numberAcc: e.target.value })}
                          id="statementFormControlInput11"
                          placeholder="Yangi turar joy  uy raqami"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput12">Uy-joy ijara summasi </CFormLabel>
                        <CFormInput
                          type="text"
                          name="price"
                          value={additionData.price}
                          onChange={(e) => setAdditionData({ ...additionData, price: e.target.value })}
                          id="statementFormControlInput12"
                          placeholder="Uy-joy ijara summasi "
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput13">Uy telefon raqami </CFormLabel>
                        <CFormInput
                          type="text"
                          name="home_phone"
                          value={additionData.home_phone}
                          onChange={(e) => setAdditionData({ ...additionData, home_phone: e.target.value })}
                          id="statementFormControlInput13"
                          placeholder="Uy telefon raqami "
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput14">Mobil telefon raqami </CFormLabel>
                        <CFormInput
                          type="text"
                          name="mobile_phone"
                          value={additionData.mobile_phone}
                          onChange={(e) => setAdditionData({ ...additionData, mobile_phone: e.target.value })}
                          id="statementFormControlInput14"
                          placeholder="Mobil telefon raqami "
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="statementFormControlInput115">Email </CFormLabel>
                        <CFormInput
                          type="text"
                          name="email"
                          value={additionData.email}
                          onChange={(e) => setAdditionData({ ...additionData, email: e.target.value })}
                          id="statementFormControlInput115"
                          placeholder="Email "
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
                  </div>
                </div>
                <br />
                <div style={{textAlign: 'center', fontWeight: 'bold', paddingBottom: '5px'}}>ANKETA-ARIZA</div>
                <div>1. {capitalizeWords(student.full_name)}</div>
                <div>2. Manzil: {student.province.name}, {student.district.name}, {additionData.mfy ? additionData.mfy: '____'} MFY, {additionData.street ? additionData.street: '____'} ko‘chasi, {additionData.home_number ? additionData.home_number: '____'}-uy </div>
                <div>3.	Tug‘ilgan sanasi: {additionData.dateOfBirth ? Moment(additionData.dateOfBirth).format('DD.MM.YYYY') : '____'} y.</div>
                <div>4. Jinsi: {student.gender.name}</div>
                <div>5.	Soliq to‘lovchining idenfikatsiya raqami (STIR): {additionData.stir ? additionData.stir : '____'}</div>
                <div>6.	Jismoniy shaxsning shaxsiy idenfikatsiya raqami: {additionData.identi_number ? additionData.identi_number : '____'}</div>
                <div>7.	O‘qish joyi: Farg‘ona politexnika instituti, boshqichi: {student.level.name}</div>
                <div>8.	Qaysi hududdagi uy-joyni ijara olmoqchisiz?  Farg‘ona shahri , {additionData.mfyAcc ? additionData.mfyAcc: '____'} MFY, {additionData.streetAcc ? additionData.streetAcc: '____'} ko‘chasi, {additionData.home_numberAcc ? additionData.home_numberAcc: '____'}-uy </div>
                <div>9.	Uy-joy ijara summasi {additionData.price ? additionData.price : '____'} so‘m</div>
                <div>10.	Siz bilan aloqaga chiqish uchun ma’lumotingiz?
                    uy tel: {additionData.home_phone ? additionData.home_phone : '____'}, uyali tel {additionData.mobile_phone ? additionData.mobile_phone : '____'}, el-pochta {additionData.email ? additionData.email : '____'}.
                </div>
                <br />
                <div style={{textAlign:'justify'}}>&nbsp;&nbsp;&nbsp;&nbsp; Men davlat tomonidan oylik ijara tolovining bir qismini qoplab berishidan manfaatdorligimni bildiraman. Pasportim va ijtimoiy mezonlarga muvofiqligimni tasdiqlovchi xujjatlar nusxalarini ilova qilmoqdaman. Ushbu ariza va unga ilova qilinayotgan xujjatlarda ko‘rsatilgan barcha ma’lumotlarning haqiqiyligini tasdiqlayman</div>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '20px'}}>
                  <div><div style={{marginBottom: '-5px'}}>_________</div><div style={{fontSize: '12px', paddingLeft: '25px'}}>(imzo)</div></div>  
                  <div>{capitalizeWords(student.short_name)}</div>  
                  <div>{today}</div>  
                </div>
                <br />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    Ariza №________ <br />
                    Qabul qilish sanasi “___” ________ 202__ y <br />
                    Qabul qilgan shaxs F.I.SH ______________ <br />
                    Qabul qilgan shaxs imzosi ______________
                </div>
              </div>)
            }
          </div> 
        </div>
      </div>
  )
}

export default Anketa
