import React, {useState, useRef} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormCheck,
  CFormLabel,
} from '@coreui/react'
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import GetStudentHemis from './GetStudentHemis';

const Treatment = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const today = Moment().format('DD.MM.YYYY')
  const url = window.location.href;
  const [student, setStudent] = useState(null);

  const [additionData, setAdditionData] = useState({
    disability: 'Men',
    disabilityType: '',
    moreContractMain: '',
    mfy: '',
    numberMoreContract: '2',
    lowIncomeWho: 'Otam',
    olymWinningPlace: 'fakultet',
  });

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
                        {url.indexOf('olympiadswinner') >= 0  && 
                            <div>
                                <CFormCheck
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    label="fakultet"
                                    value="fakultet"
                                    defaultChecked
                                    // onChange={(e) => setAdditionData({ ...additionData, olymWinningPlace: e.target.value })}
                                />
                                <CFormCheck
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    label="institut"
                                    value="institut"
                                    // onChange={(e) => setAdditionData({ ...additionData, olymWinningPlace: e.target.value })}
                                />
                            </div>
                        }
                        {(url.indexOf('lowincome') >= 0 || url.indexOf('deathmember') >= 0) && 
                            <div className="mb-3">
                                <CFormLabel htmlFor="statementFormControlInput2">Kim</CFormLabel>
                                <CFormInput
                                    type="text"
                                    name="lowIncomeWho"
                                    value={additionData.lowIncomeWho}
                                    onChange={(e) => setAdditionData({ ...additionData, lowIncomeWho: e.target.value })}
                                    id="statementFormControlInput2"
                                    placeholder="otam, onam, akam, opam"
                                />
                            </div>
                        }
                        {url.indexOf('disability') >= 0 && 
                            <div>
                              <div className="mb-3">
                                  <CFormLabel htmlFor="statementFormControlInput3">Kim</CFormLabel>
                                  <CFormInput
                                      type="text"
                                      name="disability"
                                      value={additionData.disability}
                                      onChange={(e) => setAdditionData({ ...additionData, disability: e.target.value })}
                                      id="statementFormControlInput3"
                                      placeholder="men (otam, onam, akam, ukam, opam, singlim)"
                                  />
                              </div>
                              <div className="mb-3">
                                  <CFormLabel htmlFor="statementFormControlInput34">Guruh nogironligi</CFormLabel>
                                  <CFormInput
                                      type="text"
                                      name="disabilityType"
                                      value={additionData.disabilityType}
                                      onChange={(e) => setAdditionData({ ...additionData, disabilityType: e.target.value })}
                                      id="statementFormControlInput34"
                                      placeholder="Guruh nogironligi"
                                  />
                              </div>
                            </div>

                            
                        }
                        {(url.indexOf('poorfamily') >= 0)&& 
                            <div className="mb-3">
                                <CFormLabel htmlFor="statementFormControlInput4">MFY</CFormLabel>
                                <CFormInput
                                    type="text"
                                    name="mfy"
                                    value={additionData.mfy}
                                    onChange={(e) => setAdditionData({ ...additionData, mfy: e.target.value })}
                                    id="statementFormControlInput4"
                                    placeholder="MFY"
                                />
                            </div>
                        }
                        {(url.indexOf('morecontract') >= 0 )&& 
                            <div>
                              <div className="mb-3">
                                  <CFormLabel htmlFor="statementFormControlInput4">MFY va kam ta’minlangan haqida</CFormLabel>
                                  <CFormInput
                                      type="text"
                                      name="moreContractMain"
                                      value={additionData.moreContractMain}
                                      onChange={(e) => setAdditionData({ ...additionData, moreContractMain: e.target.value })}
                                      id="statementFormControlInput4"
                                      placeholder="MFY va kam ta’minlangan haqida"
                                  />
                              </div>
                              <div className="mb-3">
                                <CFormLabel htmlFor="statementFormControlInput456">Kontrartlar soni</CFormLabel>
                                <CFormInput
                                    type="text"
                                    name="numberMoreContract"
                                    value={additionData.numberMoreContract}
                                    onChange={(e) => setAdditionData({ ...additionData, numberMoreContract: e.target.value })}
                                    id="statementFormControlInput456"
                                    placeholder="Kontrartlar soni"
                                />
                              </div>
                            </div>

                        }
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
                <div style={{textAlign: 'justify'}}>&nbsp;&nbsp;&nbsp;
                    {url.indexOf('treatment') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, betobligim sababli davolanishim uchun talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {url.indexOf('orphan') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, ota-onam vafot etganligi sababli talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {url.indexOf('disability') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, {additionData.disability} {additionData.disabilityType ? additionData.disabilityType : '_____'} inobatga olib talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {url.indexOf('poorfamily') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, {additionData.mfy ?additionData.mfy:'_____'} MFY tomonidan “ijtimoiy himoya yagona reestri” axborot tizimi orqali kam ta’minlangan deb e’tirof etilganmiz. Men va oila a’zolarim (“Ayollar yoki yoshlar daftari”)ga kiritilganmiz. Shu sababli talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {url.indexOf('morecontract') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, oilada {additionData.numberMoreContract} nafar farzand shartnoma asosida tahsil olamiz. {additionData.moreContractMain ?additionData.moreContractMain:'_____'} inobatga olib talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {(url.indexOf('lowincome') >= 0 || url.indexOf('deathmember') >= 0) && (<span>Arizamning qisqacha mazmuni shundan iboratki, {additionData.lowIncomeWho}  vafot etganligi sababli talabalar rag‘batlantirish jamg‘armasi tomonidan beriladigan bir martalik moddiy yordam ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                    {url.indexOf('olympiadswinner') >= 0 && (<span>Arizamning qisqacha mazmuni shundan iboratki, <strong>{additionData.olymWinningPlace}</strong> miqiyosida bo‘lib o‘tgan (fan olimpiadalari, Sport musobaqalari, Ilmiy-ijodiy) tanlovda g‘olib bo‘lganim uchun talabalar rag‘batlantirish jamg‘armasi tomonidan moddiy rag‘bat ajratilishiga ruxsat berishingizni  so‘rayman.</span>)}
                </div>
                <br />
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

export default Treatment
