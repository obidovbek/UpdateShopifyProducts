import React, {useState, useRef} from 'react'
import Moment from 'moment';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

var additionData;
const Ttj =  {

  form: (props)=>{
    //  return (<div>bbbbbbbbbbbb</div>)
    var [additionData, setAdditionData] = useState({
      mfy: '',
      street: '',
      home_number: '',
    });
    const { callback } = props;
    return (
      <div>
        <div className="mb-3">
          <CFormLabel htmlFor="statementFormControlInput3">MFY</CFormLabel>
          <CFormInput
            type="text"
            name="mfy"
            value={additionData.mfy}
            onChange={async (e) => {await setAdditionData({ ...additionData, mfy: e.target.value });callback(additionData); }}
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
      </div>
    )
  },
  statement: (props) => {

      const changedData = () => {
        console.log('changedData')
      }
      const capitalizeWords = (str) => {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => (word === 'o‘g‘li' || word === 'qizi') ? (word) : (word.charAt(0).toUpperCase() + word.slice(1)))
          .join(' ');
      };
      const today = Moment().format('DD.MM.YYYY')

      return (
          <div>
            <div style={{ display: 'flex',justifyContent: 'end', paddingBottom: '20px'}}>
              <div style={{textAlign: 'left', width: '285px',}}>
                Farg‘ona politexnika instituti rektori O‘.R.Salomovga &nbsp;
                {props.student.department.name} fakulteti &nbsp;
                {props.student.group.name} guruhi talabasi &nbsp; 
                {capitalizeWords(props.student.full_name)}dan
              </div>
            </div>
            <div style={{textAlign: 'center', fontWeight: 'bold', paddingBottom: '5px'}}>Ariza</div>
            <div style={{paddingBottom: '20px', textAlign: 'justify'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Arizamning mazmuni shundan iboratki, men {props.student.province.name}, {props.student.district.name},  {additionData && additionData.mfy ? additionData.mfy: '____'} MFY, {additionData && additionData.street ? additionData.street: '____'} ko‘chasi, {additionData && additionData.home_number ? additionData.home_number: '____'}-uyda yashayman. Masofa uzoqligi va ijtimoiy holatimni inobatga olib, Talabalar turar joyida istiqomat qilish uchun joy ajratilishiga ruxsat berishingizni so‘rayman.
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tilxat, pasport nusxasi, 2 dona rasm (elektroni bilan rasm oq fonda rasmiy kiyimda bo‘lishi), 1 ta hujjatlar papkasi (oddiy ipli), shartnoma va to‘lov kvitansiyasini ilova qilaman.
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '20px'}}>
              <div><div style={{marginBottom: '-5px'}}>_________</div><div style={{fontSize: '12px', paddingLeft: '25px'}}>(imzo)</div></div>  
              <div>{capitalizeWords(props.student.short_name)}</div>  
              <div>{today}</div>  
            </div>
            <div>
                <p>Tyutor:</p>
                <p>Kafedra mudiri:</p>
                <p>Pasportiska:</p>
                <p>Bino mudirasi:</p>
                <p>TTJ direktori:</p>
                <p>Dekan yoki dekan o‘rinbosari:</p>
            </div>
      </div>);
    }

  };
export default Ttj;