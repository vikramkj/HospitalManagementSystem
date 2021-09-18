function viewDoctors()
{
  $("#workArea").css("background-image","none");
  $( "#workArea").load("viewDoctors.html");
}

function viewPatients()
{
  $("#workArea").css("background-image", "none");
  $("#workArea").load("viewpatients.html");
}

function addDoctor()
{
  $("#popup").load("addDoctors.html");
  document.getElementById("popup").style.display="block";
}

function addpatient()
{
   $("#popup").load("addPatients.html");
   $("#popup").show();
}