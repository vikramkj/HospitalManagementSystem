function viewDoctors()
{
  $("#workArea").css("background-image","none");
  document.getElementById("workArea").innerHTML = "";
  loadDoctorList();
}

function viewPatients()
{
  $("#workArea").css("background-image", "none");
  document.getElementById("workArea").innerHTML = "";
  loadPatientList();
}

function addDoctor()
{
  document.getElementById("popup").style.display="block";
  $("#popup").load("addDoctors.html");
}

function addpatient()
{
   document.getElementById("popup").style.display="block";
   $("#popup").load("addPatients.html");
}

function loadDoctorList()
{
  var localData = localStorage.getItem("arrDoctorList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  var tableRows = "<table>";
  tableRows += buildDoctorListHeaders(tableRows);
  for(var i=0;i<rowData.length;i++){
      tableRows +="<tr><td>"+rowData[i].m_strDoctorName+"</td>";
      tableRows +="<td>"+rowData[i].m_nDoctorAge+"</td>";
      tableRows +="<td>"+rowData[i].m_strSpeciality+"</td>";
      tableRows +="<td>"+rowData[i].m_strQualification+"</td>";
      tableRows +="<td>"+rowData[i].m_strPhoneNumber+"</td>";
      tableRows +="<td>"+rowData[i].m_strEmailId+"</td>";
      tableRows +="<td>"+rowData[i].m_strAddress+"</td>";
      tableRows +="<td><i class='fas fa-pen' title='edit' style='font-size:20px' onclick='editDoctor("+i+")'></i><i class='fas fa-trash' title='delete' style='font-size:20px;margin-left:5px' onclick='deleteDoctor("+i+")'></i><td>";
      tableRows +="</tr>";
     }
     tableRows += "<table>";
  $("#workArea").append(tableRows);
}

function buildDoctorListHeaders(rowHeader){
    rowHeader += "<tr><th>Doctor Name</th>";
    rowHeader += "<th>Doctor Age</th>";
    rowHeader += "<th>Speciality</th>";
    rowHeader += "<th>Qualfication</th>";
    rowHeader += "<th>Phone Number</th>";
    rowHeader += "<th>Email Id</th>";
    rowHeader += "<th>Address</th>";
    rowHeader += "<th>Actions</th></tr>";
  return rowHeader;
}

function loadPatientList()
{
  var localData = localStorage.getItem("arrPatientList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  var tableRows = "<table>";
  tableRows += buildPatientListHeaders(tableRows);
  for(var i=0;i<rowData.length;i++){
      tableRows +="<tr><td>"+rowData[i].m_strPatientName+"</td>";
      tableRows +="<td>"+rowData[i].m_nPatientAge+"</td>";
      tableRows +="<td>"+rowData[i].m_strConsultedHospital+"</td>";
      tableRows +="<td>"+rowData[i].m_strDoctor+"</td>";
      tableRows +="<td>"+rowData[i].m_strPhoneNumber+"</td>";
      tableRows +="<td>"+rowData[i].m_strEmailId+"</td>";
      tableRows +="<td>"+rowData[i].m_strAddress+"</td>";
      tableRows +="<td><i class='fas fa-pen' style='font-size:20px' title='edit' onclick='editPatient("+i+")'></i><i class='fas fa-trash' title='delete' style='font-size:20px;margin-left:5px' onclick='deletePatient("+i+")'></i></td>";
      tableRows +="</tr>";
     }
     tableRows += "<table>";
  $("#workArea").append(tableRows);
}

function buildPatientListHeaders(rowHeader){
    rowHeader += "<tr><th>Patient Name</th>";
    rowHeader += "<th>Patient Age</th>";
    rowHeader += "<th>Consulting Hospital</th>";
    rowHeader += "<th>Consulted Doctor</th>";
    rowHeader += "<th>Phone Number</th>";
    rowHeader += "<th>Email Id</th>";
    rowHeader += "<th>Address</th></tr>";
    rowHeader += "<th>Actions</th></tr>";
  return rowHeader;
}
