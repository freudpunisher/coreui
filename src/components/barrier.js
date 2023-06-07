/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { CInputGroup, CFormInput, CInputGroupText, CFormSelect,CButton,CRow, CForm, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
// import MaterialTable from 'material-table'
import {useState} from 'react'
const Barrier = () => {
  return (<div>
<CForm>
<CFormSelect aria-label="Default select example" style={{width:"50%"}}>
  <option>Open this select menu</option>
  <option value="foncier">foncier</option>
  <option value="note_imposition">avis imposition</option>
<option value="transport">transport</option>
<option value="activites-professionnelles">activites professionnelles</option>
<option value="activitemarches">activitemarches</option>
<option value="espacespubliques">espacespubliques</option>
<option value="panneaupublicitaire">panneaupublicitaire</option>
<option value="publicitemurcloture">publicitemurcloture</option>
<option value="place-marches">place-marches</option>
<option value="contribuable">contribuabl</option>

</CFormSelect>
<CFormInput
    type="text"
    id="exampleFormControlInput1"
    placeholder="name@example.com"
    text="Must be 8-20 characters long."
    aria-describedby="exampleFormControlInputHelpInline"
    style={{width:"50%"}}
  />
</CForm>
{/* <MaterialTable columns={columns} data={tabledata} /> */}
  </div>)
}

export default  Barrier
