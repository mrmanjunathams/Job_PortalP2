var app =angular.module("myApp",["ngRoute"]);//module is a collection of services,derictives,controllers,filtersand configuration information
                                             //ng route helps to make your application SPA


app.config(function($routeProvider){    //to navigate to different pages in your application
    $routeProvider.when("/",{          // also for SPA
                                      //route povider is a route module  used to configure different routes in your applicati
                                          //ng model->binds the value of html controls like input select text area to application data
      templateUrl:"first.html"
    }).when("/register",{
        templateUrl:"Register.html"
    }).when("/logIn",{
        templateUrl:"LogIn.html"
    }).when("/postjob",{
        templateUrl:"addjob.html"
    }).when("/2",{
      templateUrl:"Recuiter.html"
    }).when("/1",{
      templateUrl:"Employee.html"
    }).when("/employeeprofile/:email",{
      templateUrl:"Employee_Profile.html",
      controller:"EmployeeFetchController"
}).when("/addskill",{
      templateUrl:"Add_Skill.html"
    }).when("/forgot",{
      templateUrl:"forgot.html"
    }).when("/recovery",{
      templateUrl:"recovery.html"
    }).when("/recuiterprofile/:email",{
      templateUrl:"Recuiter_Profile.html",
      controller:"RecuiterFetchController"
    }).when("/addjobs",{
      templateUrl:"addjob.html"
    }).when("/redit",{
		templateUrl:"redit.html"
	}).when("/eedit",{
		templateUrl:"eedit.html"
	}).when("/aboutus",{
		templateUrl:"AboutUs.html"
	}).when("/home",{
    controller:"tableController1",     // ng-view  container to put your content provided by routing
    controller:"tableController2",
    templateUrl:"home.html"
  }).when("/review",{
      templateUrl:"reviews.html"
    }).when("/model",{
      templateUrl:"model.html"
    });

});

//controller is a java script object created by a standrad JavaScript object constructor

//json data candidates-----#####################################################
app.controller("tableController1",function($scope,$http){                  //$scope is a application object
  $http.get("http://localhost:3050/candidates").then(function(response){
				$scope.data=response.data;
				console.log(response.data);
			})
});
//###################!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

//json data jobs/////////////////////-------------------------------##################3
app.controller("tableController2",function($scope,$http){
  $http.get("http://localhost:3050/jobs").then(function(response){
				$scope.dataj=response.data;
				console.log(response.data);
			})
});

//type text
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };






//-------@@#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Register!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!####################&*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&^^^^^^^^^^^^^^^^^^^^@@@@@@@@@@@@@@@@@@@@@@@
app.controller("RegisterController",function($scope,$http,$location){
  console.log("submit clicked");
$scope.submit=function(){
  let data={

  "email": $scope.email,
  "password": $scope.password,
  "confirmpassword":$scope.confirmpassword,
  "option":$scope.value,
  "question": $scope.question
}
console.log(data);
if($scope.value==1){
  $location.path('/'+$scope.value);
$http.post("http://localhost:3000/addemp",data).then(function(response){
  console.log(response.data);
});
}
if($scope.value==2){
  $location.path('/'+$scope.value);
  $http.post("http://localhost:3000/addrec",data).then(function(response){
    console.log(response.data);
  });

}
}
});
//!!!!!!!___-------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>########

//Login------------------------------------------------------------
app.controller("LoginController",function($scope,$http,$location){
  console.log("submit clicked");
$scope.submit=function(){
  let data={
  "email": $scope.email,
  "password": $scope.password,
  "option":$scope.value,
  }
console.log(data);
if($scope.value==1){
$http.post("http://localhost:3000/loginemp",data).then(function(response){
  console.log(response.data);
  console.log(response.data.email);
  $location.path('/employeeprofile/'+response.data.email);
//  $location.path('/employeeprofile?email=response.data.email');
  // $http.get("http://localhost:3000/employeeprofile?email="+$scope.email).then(function(response){
  //   $scope.datam=response.data;
  //   console.log("inside data fetcher");
  //   console.log($scope.datam);
  //
  //
  // });

  console.log("inside post")
  console.log(response.data);
  });
//var email1=$scope.email;

}
if($scope.value==2){
  $http.post("http://localhost:3000/loginrec",data).then(function(response){
    console.log(response.data);
    console.log(response.data.email);
    $location.path('/recuiterprofile/'+response.data.email);

    });
}
//console.log("http://localhost:3000/employeeprofile?email="+$scope.email);
// $http.get("http://localhost:3000/employeeprofile?email="+$scope.email).then(function(response){
//   $scope.datam=response.data;
//   console.log("inside data fetcher");
//   console.log($scope.datam);
//
//
// });
}
});
//------------------------------------------------------------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Employee Complete profile-------------------------------------------------->>>>>>>>>>>>>>>>>>>>>
app.controller("EmployeeController",function($scope,$http,$location,$window){
console.log("submit clicked");
$scope.submit=function(){
  let data={
  "firstname": $scope.firstname,
  "lastname": $scope.lastname,
  "male":$scope.male,
  "female":$scope.female,
  "Current_Position":$scope.Current_Position,
  "years_of_experience":$scope.years_of_experience,
  "contact":$scope.contact,
  "address":$scope.address,
  "date":$scope.date,
  "email":$scope.email
  }
console.log(data);
$location.path('/employeeprofile');
$http.post("http://localhost:3000/employee",data).then(function(response){
  console.log(response.data);

if(response.data) {
  $location.path('/logIn');
  $window.alert('Successfully Registered Please Login');
}
});

}
});
//!!!!!!!!!!!!!!!!-------------------------------------------------------------------------------------------------------------->>>>>>


//Recuiter complete profile----------------------------------------------------------------------------
//----------------------------------------------------------------------
app.controller("RecuiterController",function($scope,$http,$location){

console.log("submit clicked");

$scope.submit=function(){

  let data={
  "company_name": $scope.company_name,
  "Company_website": $scope.Company_website,
  "Company_Location":$scope.Company_Location,

  "contact":$scope.contact,
  "name_of_ceo":$scope.name_of_ceo,

  "email":$scope.email

  }
console.log(data);
$location.path('/recuiterprofile');
$http.post("http://localhost:3000/recuiter",data).then(function(response){
  console.log(response.data);
  if(response.data)    $location.path('/logIn');
});

}
});
//!!!!!!!!!!!!!!!!!!!!!!__----------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//EMpprf retrival---------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.controller("EmployeeFetchController",function($scope,$http,$location,$routeParams){
console.log("email");
 console.log($routeParams.email);
 $http.get("http://localhost:3000/employeeprofile?email="+$routeParams.email).then(function(response){
    $scope.datam=response.data;
    console.log("inside data fetcher");
    console.log($scope.datam);
 });

  });
//--------------------------------------------------------------------------

app.controller("RecuiterFetchController",function($scope,$http,$location,$routeParams){
console.log("email");
 console.log($routeParams.email);
 $http.get("http://localhost:3000/recuiterprofile?email="+$routeParams.email).then(function(response){
    $scope.datan=response.data;
    console.log("inside data fetcher");
    console.log($scope.datan);


 })
  });
//-------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.controller("SkillController",function($scope,$http,$location){

  console.log("submit clicked");
  $scope.submit1=function(){
    let data={
    "technology": $scope.technology,
    "github_link": $scope.github_link,
    "certificate":$scope.certificate
    }
  console.log(data);

  $http.post("http://localhost:3000/addskill",data).then(function(response){
    console.log(response.data);
      $location.path('/employeeprofile/vijay@gmail.com');
});

  }
});
//--------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.controller("AddjobsController",function($scope,$http,$location){

  console.log("submit clicked");
  $scope.submit1=function(){
    let data={
      "domain":$scope.domain,
    "designation": $scope.designation,
    "skills_required": $scope.skills_required,
    "place":$scope.place,
    "description":$scope.description,
    "salary":$scope.salary,
    "date":$scope.date,
    "time":$scope.time
    }
  console.log(data);
$http.post("http://localhost:3000/addjobs1",data).then(function(response){
    console.log(response.data);
     $location.path('/recuiterprofile/karthik@gmail.com');
});
  }
});
/*---------------------------------------------------------------------------------------------*/
