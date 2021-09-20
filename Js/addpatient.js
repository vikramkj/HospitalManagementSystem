function cancelAddDoctor(){
    $("#popup").hide();
 }
 
 function createPatient(event)
 {
    var oPatientListData = getPatientData();
    var localData = JSON.parse(localStorage.getItem("arrPatientList"));
    var list = localData !== null  ? localData : [];
    list.push(oPatientListData); 
    localStorage.setItem("arrPatientList",JSON.stringify(list));
    event.preventDefault();
    $("#popup").hide();
    $("#workArea").css("background-image", "none");
    document.getElementById("workArea").innerHTML = "";
    loadPatientList();
  }
 
  function getPatientData()
  {
    var oDoctorData = {};
    oDoctorData.m_strPatientName = $("#patient_name").val();
    oDoctorData.m_nPatientAge = $("#patient_age").val();
    oDoctorData.m_strConsultedHospital = $("#consulting_hospital").val();
    oDoctorData.m_strDoctor = $("#doctor_dropdown_list").val();
    oDoctorData.m_strPhoneNumber = $("#patient_phone_number").val();
    oDoctorData.m_strEmailId = $("#patient_email_id").val();
    oDoctorData.m_strAddress = $("#patient_address").val();
    return oDoctorData;
  }
 
  function loadPatientList()
 {
   var localData = localStorage.getItem("arrPatientList");
   var rowData = localData !== null ? JSON.parse(localData) :[];
   var tableRows = "<table>";
   tableRows += buildPatientListHeaders();
   for(var i=0;i<rowData.length;i++){
       tableRows +="<tr><td>"+rowData[i].m_strPatientName+"<td>";
       tableRows +="<td>"+rowData[i].m_nPatientAge+"<td>";
       tableRows +="<td>"+rowData[i].m_strConsultedHospital+"<td>";
       tableRows +="<td>"+rowData[i].m_strPhoneNumber+"<td>";
       tableRows +="<td>"+rowData[i].m_strEmailId+"<td>";
       tableRows +="<td>"+rowData[i].m_strAddress+"<td>";
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
    rowHeader += "<th>Phone Number</th>";
    rowHeader += "<th>Email Id</th>";
    rowHeader += "<th>Address</th>";
    rowHeader += "</tr>";
  return rowHeader;
}