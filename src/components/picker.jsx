import React, { useState, useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import '../styles/body.css';
import swal from 'sweetalert'
// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = 'AIzaSyCZNcTHPheN-pct2HR56NL_PCMYtmXc8RM';

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = "724359877010-h4k0u2d9kg10e13819vbk99uqvjen0d3.apps.googleusercontent.com"

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
// var appId = "724359877010";

// // Scope to use to access user's Drive items.
// var scope = 'https://www.googleapis.com/auth/drive.file';
// var scopeSheet = 'https://www.googleapis.com/auth/spreadsheets.readonly'
// var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// var pickerApiLoaded = false;
// var oauthToken;

//const URL = 'https://apisendtemplate.herokuapp.com'
//const URL = 'http://localhost:2800'
const URL = 'http://10.0.0.14:2800'
var range;

function Picker(template) {

  const [openPicker, authResponse] = useDrivePicker();
  const [stateData, setStateData] = useState("0");
  const [stateUsers, setStateUsers] = useState([]);
  // const customViewsArray = [new google.picker.DocsView()]; // custom view

  // useEffect(()=>{
  //   console.log(stateUsers)
  // },[stateUsers])


  useEffect(() => {
  
    if (stateUsers.length > 0 && stateData === 2) {
      const datosDuplicados = new Set(stateUsers.map(user => user[2] )).size < stateUsers.map(user => user[2]).length;
      
      if (datosDuplicados) {
        swal("Alerta!", "Existen datos repetidos, verifique y carguelo de nuevo", "warning");
        setStateData("0");
        setStateUsers([]);
      }
    }
  }, [stateUsers]);

  var templateSelected = Object.values(template).join('')

  switch (templateSelected) {
    case "1":
      range = '!A2:B'
      break;
    case "2":
      range = '!A2:C'
      break;
    case "3":
      range = '!A2:E'
      break;
    case "4":
      range = '!A2'
      break;
    case "5":
      range = '!A2:E'
      break;
    case "6":
      range = '!A2:B'
      break;
    case "7":
      range = '!A2:D'
      break;
    case "8":
      range = '!A2:A'
      break;
    case "9":
      range = '!A2:B'
      break;
    case "10":
      range = '!A2:B'
      break;
    default:
      range = null;
      break;
  }
  const handleOpenPicker = () => {
    openPicker({
      clientId: clientId,
      developerKey: developerKey,
      viewId: "SPREADSHEETS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        var id = data.docs[0].id;

        fetch(`${URL}/?id=${id}&range=${range}`)
          .then(response => response.json())
          .then(response => {
            setStateData(response.length)
            setStateUsers(response)
            
          })
      },
    })
  }

  function sendTemplates() {
    console.log(stateUsers)
   var users = {template:templateSelected,data: stateUsers}
   
    fetch(`${URL}/`,{
      method:'POST',
      body: JSON.stringify(users),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        
        if (response === true) {
          swal({
            title: "OK", 
            text: "Los mensajes fueron enviados con exito",
            icon: "success",

          })
            .then((value) => {
              if (value) {
                window.location.reload();
              }
            })


        } else {
          swal("Alerta!", "ALgunos mensajes no fueron enviados", "info")
          setStateData("0")
          setStateUsers([])

        }

      })
  }
  function cancelSendTemplates() {

    setStateData("0")
    setStateUsers([])
  }

  if (stateData === "0") {
    return (
      <div className='container-button'>
        <button className='button-cargar' onClick={() => handleOpenPicker()}>Cargar Archivo</button>
      </div>
    );
  } else {

    return (

      <div className='container-button'>
        <p>Se cargaron <span className='cantidad'>({stateData})</span>  contactos</p>
        <div className='container-buttons'>
          <button className='button-cargar' onClick={() => sendTemplates()}>Enviar template</button>
          <button className='button-cancelar' onClick={() => cancelSendTemplates()}>Cancelar</button>
        </div>

      </div>
    );
  }



}

export default Picker;
