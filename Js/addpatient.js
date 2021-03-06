function validateFields()
{
  validatePatientFormData();
  populateDoctorDropdown();
}

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

function validatePatientFormData(){

  var $registerForm = $("#patient_form");

  $.validator.addMethod("noSpace",function(value,element){
     return value == '' || value.trim().length !=0
  },"spaces");

  $.validator.addMethod("validateEmail",function( value, element ) {
    return this.optional( element ) || /[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]+/.test( value );
  },"emails");

  $.validator.addMethod("phoneNo",function( value, element ) {
    return this.optional( element ) || /[0-9]{10}/.test( value );
  },"phoneNumbers");

  $.validator.addMethod("numbers",function( value, element ) {
    return value > 0 && value <100;
  },"numbers");

  if($registerForm.length){
     $registerForm.validate({
      debug: true,
      success: "valid",
       rules : {
        patientName : {
           required : true,
           noSpace : true,
         },
         patientAge :{
           required : true,
           numbers : true,
         },
         consultingHospital :{
           required : true,
           noSpace : true,
         },
         doctorList :{
           required : true,
         },
         phoneNumber :{
          required : true,
          noSpace : true,
          phoneNo : true,
          maxlength :10,
          minlength :10
         },
         emailId :{
          required : true,
          email : true,
          noSpace : true,
          validateEmail : true
         },
         address :{
           required : true,
         }
       },
       messages:{
        patientName : {
          required : "please enter user name",
          noSpace : "spaces not allowed"
        },
        patientAge :{
          required : "please enter valid Age",
          numbers : "please enter valid Age"
        },
        consultingHospital :{
          required : "please enter consulting hospital"
        },
        doctorList :{
          required : "please select doctor"
        },
        phoneNumber :{
          required : "please enter valid phone number",
          phoneNo : "please enter valid phone number",
        },
        emailId :{
          required : "please enter valid email id",
          email:"please enter valid email id",
          validateEmail : "please enter valid email id"
        },
        address :{
          required : "please Enter the Address"
        }
       }
     });
  }
}

function cancelAddPatient(){
   $("#popup").hide();
 }
 
 function createPatient(event)
 {
  validatePatientFormData();
  if($("#patient_form").valid())
   {
      createOrUpdatepatientData();
   }
   event.preventDefault();
 }

  function createOrUpdatepatientData()
  {
    if($("#patient_create_btn").val() === "Update")
    {
      updatePatient();
    }
    else{
      createNewPatient();
    }
    $("#popup").hide();
    $("#workArea").css("background-image", "none");
    document.getElementById("workArea").innerHTML = "";
    loadPatientList();
  }

  function createNewPatient()
  {
    var oPatientListData = getPatientData();
    var localData = JSON.parse(localStorage.getItem("arrPatientList"));
    var list = localData !== null  ? localData : [];
    list.push(oPatientListData); 
    localStorage.setItem("arrPatientList",JSON.stringify(list));
  }

  function updatePatient()
  {
    var oDoctorListData = getPatientData();
    var localData = JSON.parse(localStorage.getItem("arrPatientList"));
    var index = JSON.parse(localStorage.getItem("patientIndex"));
    localData[index] = oDoctorListData;
    localStorage.setItem("arrPatientList",JSON.stringify(localData));
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
       tableRows +="<td><i class='fas fa-pen' style='font-size:20px' title='edit' onclick='editPatient("+i+")'></i><i class='fas fa-trash' title='delete' style='font-size:20px;margin-left:5px' onclick='deletePatient("+i+")'></i></td>";
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
  this.event.preventDefault();
  var localData = localStorage.getItem("arrPatientList");
  var rowData = localData !== null ? JSON.parse(localData) :[];
  document.getElementById("popup").style.display="block";
  localStorage.setItem('patientIndex',index);
  $("#popup").load("addPatients.html");
  setTimeout(function(){
  setPatientData(rowData[index]);
},10);
}

function setPatientData(rowData)
{
  $("#patient_name").val(rowData.m_strPatientName);
  $("#patient_age").val(rowData.m_nPatientAge);
  $("#consulting_hospital").val(rowData.m_strConsultedHospital);
  $("#doctor_dropdown_list").val(rowData.m_strDoctor).change();
  $("#patient_phone_number").val(rowData.m_strPhoneNumber);
  $("#patient_email_id").val(rowData.m_strEmailId);
  $("#patient_address").val(rowData.m_strAddress);
  $("#patient_create_btn").val("Update");
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
  rowData.splice(index,1);
  localStorage.setItem("arrPatientList",JSON.stringify(rowData));
  $("#deleteDialog").hide();
  loadPatientList();
}
