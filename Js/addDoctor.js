function cancelAddDoctor(){
   $("#popup").hide();
}

function createDoctor(event)
{
   var oDoctorListData = getDoctorData();
   var localData = JSON.parse(localStorage.getItem("arrDoctorList"))
   var list = localData !== null? localData : [];
   list.push(oDoctorListData); 
   localStorage.setItem("arrDoctorList",JSON.stringify(list));
   event.preventDefault();
   $("#popup").hide();
   $("#workArea").css("background-image", "none");
   document.getElementById("workArea").innerHTML = "";
   loadDoctorList();
 }

 function getDoctorData()
 {
   var oDoctorData = {};
   oDoctorData.m_strDoctorName = $("#doctor_name").val();
   oDoctorData.m_nDoctorAge = $("#doctor_age").val();
   oDoctorData.m_strSpeciality = $("#doctor_speciality").val();
   oDoctorData.m_strQualification = $("#doctor_qualification").val();
   oDoctorData.m_strPhoneNumber = $("#dotor_phone_number").val();
   oDoctorData.m_strEmailId = $("#doctor_email_id").val();
   oDoctorData.m_strAddress = $("#doctor_address").val();
   return oDoctorData;
 }

 function loadDoctorList()
{
  var localData = localStorage.getItem("arrDoctorList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  var tableRows = "<table>";
  tableRows += buildHeaders();
  for(var i=0;i<rowData.length;i++){
      tableRows +="<tr><td>"+rowData[i].m_strDoctorName+"<td>";
      tableRows +="<td>"+rowData[i].m_nDoctorAge+"<td>";
      tableRows +="<td>"+rowData[i].m_strSpeciality+"<td>";
      tableRows +="<td>"+rowData[i].m_strQualification+"<td>";
      tableRows +="<td>"+rowData[i].m_strPhoneNumber+"<td>";
      tableRows +="<td>"+rowData[i].m_strEmailId+"<td>";
      tableRows +="<td>"+rowData[i].m_strAddress+"<td>";
      tableRows +="</tr>";
     }
     tableRows += "<table>";
  $("#workArea").append(tableRows);
}

function buildHeaders(){
    var rowHeader = "<tr>";
    rowHeader += "<th>Doctor Name</th>";
    rowHeader += "<th>Doctor Age</th>";
    rowHeader += "<th>Speciality</th>";
    rowHeader += "<th>Qualfication</th>";
    rowHeader += "<th>Phone Number</th>";
    rowHeader += "<th>Email Id</th>";
    rowHeader += "<th>Address</th>";
    rowHeader += "</tr>";
  return rowHeader;
}