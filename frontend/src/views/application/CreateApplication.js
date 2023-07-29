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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useReactToPrint } from 'react-to-print';
// import ttj from './statements/ttj';
import Ttj from './statements/Ttj';
import GetStudentHemis from './GetStudentHemis';

const CreateApplication = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [student, setStudent] = useState(null);

  const getStudent = async (st) =>{
    await setStudent(st);
  }
  const callbackAddtionalData = async (event) => {console.log('callbackAddtionalData',event);}
  return (
      <div class="cr-app-wrap">
        <div class="cr-app-wrap-1">
              <CCard className="mb-4" style={{ width:'100%'}}>
                <CCardHeader>
                  <strong>Ariza yaratish</strong>
                </CCardHeader>
                <CCardBody>
                    {/* <TtjStatement /> */}
                    <GetStudentHemis callback={getStudent} />
                    {student && 
                    (<CForm> 
                      <Ttj.form callback={callbackAddtionalData} />
                      <CButton
                        color={"primary"}
                        style={{textAlign: 'center'}}
                        onClick={handlePrint}
                      >
                        Print
                      </CButton>
                    </CForm>)
                    }
                </CCardBody>
              </CCard>
        </div>
        <div class="cr-app-wrap-2">
          <div class="page4 size"  ref={componentRef}>
            { student && 
              <Ttj.statement student={student} />
            }
          </div> 
        </div>
      </div>
  )
}

export default CreateApplication
