import React, { useContext } from 'react'
import CreatedProjectContext from '../../../utils/CreatedProjectContext'

function CurrentProject ({currentProjectData}) {
   const dataObject = currentProjectData()

    return  (
      <div>
        <p>Project name: {dataObject.name}</p>
        <p>Project Description: {dataObject.description}</p>
        <p>Project Skills: {dataObject.skills}</p>
      </div>
    )
  }



export default CurrentProject
