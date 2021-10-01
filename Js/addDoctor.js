function validateDoctorForm()
{
  validateDoctorFormData();
}

function validateDoctorFormData(){

  var $registerForm = $("#doctor_form");

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
         doctorName : {
           required : true,
           noSpace : true,
         },
         doctorAge :{
           required : true,
           numbers : true,
         },
         doctorSpeciality :{
           required : true,
           noSpace : true,
         },
         doctorQualification :{
           required : true,
           noSpace : true,
         },
         phoneNumber :{
          required : true,
          noSpace : true,
          phoneNo : true,
          maxlength :10,
          minlength :10
         },
         emailid :{
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
        doctorName : {
          required : "please enter user name",
          noSpace : "spaces not allowed"
        },
        doctorAge :{
          required : "please enter valid Age",
          numbers : "please enter valid Age"
        },
        doctorSpeciality :{
          required : "please enter valid speciality"
        },
        doctorQualification :{
          required : "please enter invalid Qualification"
        },
        phoneNumber :{
          required : "please enter valid phone number",
          phoneNo : "please enter valid phone number",
        },
        emailid :{
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

function cancelAddDoctor(){
   $("#popup").hide();
}

function createDoctor(event)
{
 validateDoctorFormData();
 if($("#doctor_form").valid())
  {
     createorUpdateData();
  }
  event.preventDefault();
 }

 function validateForm ()
{
	var bValid = true;
	var arrElements = $("#doctor_form").children().find (".validatebox");
  $("#doctor_form").validate();
	for (var nIndex=0; nIndex < arrElements.length; nIndex++)
		if ((bValid = $('#'+arrElements[nIndex].id).valid()) == false)
			break;
	return bValid;
}

 function createorUpdateData()
 {
    if($("#doctor_create_btn").val() === "Update")
    {
        updateDoctor();
    }
    else{
       createNewDoctor();
    }
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
      tableRows +="<td><i class='fas fa-pen' style='font-size:20px' title='edit' onclick='editDoctor("+i+")'></i><i class='fas fa-trash' style='font-size:20px;margin-left:5px' title='delete' onclick='deleteDoctor("+i+")'></i></td>";
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
  rowData.splice(index,1);
  localStorage.setItem("arrDoctorList",JSON.stringify(rowData));
  loadDoctorList();
  $("#deleteDialog").hide();
}

function cancelDeleteDialog()
{
  $("#deleteDialog").hide();
}