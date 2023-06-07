/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { CFormInput,  CFormSelect,CButton, CForm, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
// import MaterialTable from 'material-table'

import {useEffect} from 'react'
import axios from 'axios'

const Control = () => {

  const API_URL = "http://192.168.200.86:5000/api/v1/noteimposition/verification/" 
  const token = JSON.parse(sessionStorage.getItem('user'))
  const user = JSON.parse(sessionStorage.getItem('user'))
  console.log(user?.username)
  
  const config = {
    headers: {
    Authorization:`Token ${token}`
    }
    };
   
  const [data1, setData1] = useState(null)
const [isSelected, SetisSelected] = useState()
const [numero_parcelle,setNumero_parcelle] = useState("")
const [nom_marche,setNom_marche] = useState([])
const [nameInput, setNameInput] = useState()


console.log(nameInput)

const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    let module = null
    let content = null

    if(isSelected === 'foncier'){
        module = isSelected
        content ={numero_parcelle:numero_parcelle}
        console.log(content)
    

    }
    else if(isSelected === 'activites-professionnelles'){
      module = isSelected
      content ={numero_activite:numero_parcelle}
      console.log(content,isSelected)
  

  }
  else if(isSelected === 'note_imposition'){
    module = isSelected
    content ={note_imposition:numero_parcelle}
    console.log(content,isSelected)


}
else if(isSelected === 'transport'){
  module = isSelected
  content ={plaque:numero_parcelle}
  console.log(content,isSelected)

}
else if(isSelected === 'activite-marches'){
  module = isSelected
  content ={numero_activite:numero_parcelle}
  console.log(content,isSelected)

}
else if(isSelected === 'contribuable'){
  module = isSelected
  content ={numero_matricule:numero_parcelle}
  console.log(content,isSelected)

}
else if(isSelected === 'place-marches'){
  module = isSelected
  content ={numero_place:numero_parcelle,nom_marche:nameInput}
  console.log(content,isSelected)

}
    let response = null
    if(module != null && content != null){
      response = await axios.post(API_URL+`${module}/`,content,config)
      console.log(response.data)
    }
    setData1(response?.data?.response_data)
    console.log(data1) 
  } catch (error) {
    console.log(error)
  }
}



useEffect(() => {
  axios
  .get("http://192.168.200.86:5000/api/v1/list_nom_marche/")
  .then((response) => {
  // Mettre à jour l'état des posts avec la réponse
  setNom_marche(response.data);
  console.log(nom_marche.nom)
  })
  .catch((error) => {
  // Gérer l'erreur
  console.error(error);
  });
  }, []);
  // useEffect(()=>{

  // },[data1])

  const handleChange = (e) =>{
    e.preventDefault();
setNumero_parcelle(e.target.value)
console.log(numero_parcelle)

  }


 const handleSelected = (e) =>{
  e.preventDefault()
  SetisSelected(e.target.value)
  console.log(isSelected)
 } 
//  const handleMarche = (e) =>{
//   e.preventDefault()
//   setNom_marche(e.target.value)
//  }

const handleShopName = (e) =>{
  e.preventDefault()
  setNameInput(e.target.value)
}
  return (
    <>
  <CFormSelect aria-label="Default select example" onChange={handleSelected} style={{width:"50%"}}>
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
  <CForm onSubmit={handleSubmit}>
  <CFormInput
    type="text"
    id="exampleFormControlInput1"
    label={isSelected}
    placeholder="name@example.com"
    text="Must be 8-20 characters long."
    aria-describedby="exampleFormControlInputHelpInline"
    value={numero_parcelle}
    onChange={handleChange}
    style={{width:"50%"}}
  />
  {isSelected === "place-marches" ?  <CFormSelect style={{width:"50%"}} onChange={handleShopName}>
    {nom_marche.map((shop)=>(<option key={shop.id} value={shop.id}>
      {shop.nom}</option>))}
  </CFormSelect>  :""}
  <CButton type="submit">search</CButton>
</CForm>


{data1 && data1.map((data)=>{
  return(
  <CTable bordered >
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">reference</CTableHeaderCell>
      <CTableHeaderCell scope="col">titre</CTableHeaderCell>
      <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
      <CTableHeaderCell scope="col">Nic</CTableHeaderCell>
      <CTableHeaderCell scope="col">periode</CTableHeaderCell>
      <CTableHeaderCell scope="col">taxe_montant</CTableHeaderCell>
      <CTableHeaderCell scope="col">taxe_montant_paye</CTableHeaderCell>
      <CTableHeaderCell scope="col">ni_type</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
      <CTableHeaderCell key={data.id} scope="row">{data.reference}</CTableHeaderCell>
      <CTableDataCell>{data.titre}</CTableDataCell>
      <CTableDataCell>{data.nom}</CTableDataCell>
      <CTableDataCell>{data.nic}</CTableDataCell>
      <CTableDataCell>{data.periode}</CTableDataCell>
      <CTableDataCell>{data.taxe_montant}</CTableDataCell>
      <CTableDataCell>{data.taxe_montant_paye}</CTableDataCell>
      <CTableDataCell>{data.ni_type}</CTableDataCell>

    </CTableRow>
  </CTableBody>
</CTable>)
})}


    </>
  )
}
export default Control
