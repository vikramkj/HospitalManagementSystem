function validateForm() {
  var $registerForm = $("#doctor_form");
  if($registerForm.length){
     $registerForm.validate({
       rules : {
         doctorName : {
           required : true
         }
       },
       messages:{
        doctorName : {
          required : "Doctor Name is mandatory"
        }
       }
     });
  }
}

function cancelAddDoctor(){
   $("#popup").hide();
}

function createDoctor(event)
{
  validateForm();
  if($("#doctor_create_btn").val() === "Update")
   {
     updateDoctor();
   }
  else{
    createNewDoctor();
   }
   event.preventDefault();
   $("#popup").hide();
   $("#workArea").css("background-image", "none");
   loadDoctorList();
 }

 function createNewDoctor()
 {
    var oDoctorListData = getDoctorData();
    var localData = JSON.parse(localStorage.getItem("arrDoctorList"))
    var list = localData !== null? localData : [];
    list.push(oDoctorListData); 
    localStorage.setItem("arrDoctorList",JSON.stringify(list));
 }

 function updateDoctor()
 {
    var oDoctorListData = getDoctorData();
    var localData = JSON.parse(localStorage.getItem("arrDoctorList"));
    var index = JSON.parse(localStorage.getItem("doctorIndex"));
    localData[index] = oDoctorListData;
    localStorage.setItem("arrDoctorList",JSON.stringify(localData));
 }


 function getDoctorData()
 {
   var oDoctorData = {};
   oDoctorData.m_strDoctorName = $("#doctor_name").val();
   oDoctorData.m_nDoctorAge = $("#doctor_age").val();
   oDoctorData.m_strSpeciality = $("#doctor_speciality").val();
   oDoctorData.m_strQualification = $("#doctor_qualification").val();
   oDoctorData.m_strPhoneNumber = $("#doctor_phone_number").val();
   oDoctorData.m_strEmailId = $("#doctor_email_id").val();
   oDoctorData.m_strAddress = $("#doctor_address").val();
   return oDoctorData;
 }

 function loadDoctorList()
{
  document.getElementById("workArea").innerHTML = "";
  var localData = localStorage.getItem("arrDoctorList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  var tableRows = "<table>";
  tableRows += buildHeaders();
  for(var i=0;i<rowData.length;i++){
      tableRows +="<tr><td>"+rowData[i].m_strDoctorName+"</td>";
      tableRows +="<td>"+rowData[i].m_nDoctorAge+"</td>";
      tableRows +="<td>"+rowData[i].m_strSpeciality+"</td>";
      tableRows +="<td>"+rowData[i].m_strQualification+"</td>";
      tableRows +="<td>"+rowData[i].m_strPhoneNumber+"</td>";
      tableRows +="<td>"+rowData[i].m_strEmailId+"</td>";
      tableRows +="<td>"+rowData[i].m_strAddress+"</td>";
      tableRows +="<td><i class='fas fa-pen' style='font-size:20px' onclick='editDoctor("+i+")'></i><i class='fas fa-trash' style='font-size:20px;margin-left:5px' onclick='deleteDoctor("+i+")'></i></td>";
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
    rowHeader += "<th>Actions</th>";
    rowHeader += "</tr>";
  return rowHeader;
}

function editDoctor(index)
{
  this.event.preventDefault();
  var localData = localStorage.getItem("arrDoctorList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  document.getElementById("popup").style.display="block";
  localStorage.setItem('doctorIndex',index);
  $("#popup").load("addDoctors.html");
  setTimeout(function(){
  setDoctorData(rowData[index]);
},10);
}

function setDoctorData(rowData)
{
  $("#doctor_name").val(rowData.m_strDoctorName);
  $("#doctor_age").val(rowData.m_nDoctorAge);
  $("#doctor_speciality").val(rowData.m_strSpeciality);
  $("#doctor_qualification").val(rowData.m_strQualification);
  $("#doctor_phone_number").val(rowData.m_strPhoneNumber);
  $("#doctor_email_id").val(rowData.m_strEmailId);
  $("#doctor_address").val(rowData.m_strAddress);
  $("#doctor_create_btn").val("Update");
}

function deleteDoctor(index)
{
  localStorage.setItem('doctorIndex',index);
  document.getElementById("deleteDialog").style.display="block";
  $("#deleteDialog").load("deleteDoctor.html");
}

function deleteDoctorData()
{
  var localData = localStorage.getItem("arrDoctorList");
  var index = parseInt(localStorage.getItem('doctorIndex'));
  var rowData = localData !== null ? JSON.parse(localData) :[];
  if(index !== 0)
    rowData.splice(index,index);
  else
    rowData.splice(index,index+1);
  localStorage.setItem("arrDoctorList",JSON.stringify(rowData));
  loadDoctorList();
  $("#deleteDialog").hide();
}

function cancelDeleteDialog()
{
  $("#deleteDialog").hide();
}


