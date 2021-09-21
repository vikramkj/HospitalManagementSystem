$(document).ready(function(){
  populateDoctorDropdown();
})
function populateDoctorDropdown()
    {
       var oDropdownList =JSON.parse(localStorage.getItem("arrDoctorList"));
       var oDoctorList = '<option value="">Select Doctor</option>';  
       for (var i = 0; i < oDropdownList.length; i++) 
       {  
           oDoctorList += '<option value="' + oDropdownList[i].m_strDoctorName + '">' + oDropdownList[i].m_strDoctorName + '</option>';  
       }  
       $("#doctor_dropdown_list").html(oDoctorList);
  }

function cancelAddPatient(){
   $("#popup").hide();
 }
 
 function createPatient(event)
 {
    var oPatientListData = getPatientData();
    var localData = JSON.parse(localStorage.getItem("arrPatientList"));
    var list = localData !== null  ? localData : [];
    list.push(oPatientListData); 
    localStorage.setItem("arrPatientList",JSON.stringify(list));
    $("#popup").hide();
    $("#workArea").css("background-image", "none");
    document.getElementById("workArea").innerHTML = "";
    loadPatientList();
    event.preventDefault();
  }

 
  function getPatientData()
  {
    var oDoctorData = {};
    oDoctorData.m_strPatientName = $("#patient_name").val();
    oDoctorData.m_nPatientAge = $("#patient_age").val();
    oDoctorData.m_strConsultedHospital = $("#consulting_hospital").val();
    oDoctorData.m_strDoctor = document.getElementById("doctor_dropdown_list").value;
    oDoctorData.m_strPhoneNumber = $("#patient_phone_number").val();
    oDoctorData.m_strEmailId = $("#patient_email_id").val();
    oDoctorData.m_strAddress = $("#patient_address").val();
    return oDoctorData;
  }
 
  function loadPatientList()
 {
   document.getElementById("workArea").innerHTML = "";
   var localData = localStorage.getItem("arrPatientList");
   var rowData = localData !== null ? JSON.parse(localData) :[];
   var tableRows = "<table>";
   tableRows += buildPatientListHeaders();
   for(var i=0;i<rowData.length;i++){
       tableRows +="<tr><td>"+rowData[i].m_strPatientName+"</td>";
       tableRows +="<td>"+rowData[i].m_nPatientAge+"</td>";
       tableRows +="<td>"+rowData[i].m_strConsultedHospital+"</td>";
       tableRows +="<td>"+rowData[i].m_strDoctor+"</td>";
       tableRows +="<td>"+rowData[i].m_strPhoneNumber+"</td>";
       tableRows +="<td>"+rowData[i].m_strEmailId+"</td>";
       tableRows +="<td>"+rowData[i].m_strAddress+"</td>";
       tableRows +="<td><i class='fas fa-pen' style='font-size:20px' onclick='editPatient("+i+")'></i><i class='fas fa-trash' style='font-size:20px;margin-left:5px' onclick='deletePatient("+i+")'></i></td>";
       tableRows +="</tr>";
      }
      tableRows += "<table>";
   $("#workArea").append(tableRows);
 }
 
 function buildPatientListHeaders(){
    var rowHeader = "<tr>";
    rowHeader += "<th>Patient Name</th>";
    rowHeader += "<th>Patient Age</th>";
    rowHeader += "<th>Consulting Hospital</th>";
    rowHeader += "<th>Consulted Doctor</th>";
    rowHeader += "<th>Phone Number</th>";
    rowHeader += "<th>Email Id</th>";
    rowHeader += "<th>Address</th>";
    rowHeader += "<th>Actions</th></tr>";
    rowHeader += "</tr>";
  return rowHeader;
}

function editPatient(index)
{
  alert(index);
}

function deletePatient(index)
{
  localStorage.setItem('patientIndex',index);
  document.getElementById("deleteDialog").style.display="block";
  $("#deleteDialog").load("deletePatient.html");
}

function deletePatientData()
{
  var localData = localStorage.getItem("arrPatientList");
  var index = parseInt(localStorage.getItem('patientIndex'));
  var rowData = localData !== null ? JSON.parse(localData) :[];
  if(index !== 0)
    rowData.splice(index,index);
  else
    rowData.splice(index,index+1);
  localStorage.setItem("arrPatientList",JSON.stringify(rowData));
  $("#deleteDialog").hide();
  loadPatientList();
}
