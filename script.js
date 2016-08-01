

var STORAGE_ID = 'cityweather';
var source = $('#weather-template').html();
var template = Handlebars.compile(source);

var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cities));
  };


var cities = getFromLocalStorage();


var searchCityApi = function (getUserCity){     //search the API for the user's city
  
  $.get("http://api.openweathermap.org/data/2.5/weather?q="+getUserCity+"&appid=d703871f861842b79c60988ccf3b17ec", function(city){
    
    // console.log(getUserCity);


    var cityName = city.name;   //Get city name from the json

    var tempC = Math.round(city.main.temp - 273.15);          //Convert temp to Celsius
    var tempF = Math.round(city.main.temp * (9/5) -459.67);   //Convert temp to Fahrenheit
                

    var date = new Date();                                    //get seaarch date
    var day = date.getDate();
    var monthIndex = 1+date.getMonth();
    var year = date.getFullYear();    
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var dateTime = day +"/"+ monthIndex + "/" + year + "    " + hours + ":" + min + ":" + sec;   //Fix the format for date   

    var city = {
      cityName : cityName,
      tempC : tempC,
      tempF : tempF,
      dateTime : dateTime
    };
    
    cities.push(city);                       //push the object with the information into the array

    $('.city-div').empty();
    var newHTML = template({cities});                 //append
    $('.city-div').append(newHTML);
    saveToLocalStorage();
  });


}


function addComment (addCom){
  var getComment = $(addCom).closest('div').prev().find('#comment').val();
  var $appendCommentDiv = $(addCom).closest('div').closest('.add-comment-div').next('.comments-display');
  $appendCommentDiv.append('<div id = "comm">' + getComment + '</div>');
  // console.log($appendCommentDiv);

};

function deleteCity (deletecity){                   //remove city information (DOM and localStorge)
  var indexOfCity = $(deletecity).closest('.delete-city-div').closest('.addedCity').index();
  cities.splice(indexOfCity,1);
  $(deletecity).closest('div').parent().remove();  
  saveToLocalStorage();
   // console.log(indexOfCity);
};


function loadAll(){                 //load all from LocalStorage on page load
  $('city-div').empty();
  
  var newHTML = template({cities});                 //append from the array - must use curly braces for handlebars
   $('.city-div').append(newHTML);
}


$('.btn-primary').on('click', function (e) {
  e.preventDefault();
  var getUserCity = $('#city').val();
  // var city = getUserCity.split(" ").join("+");

  searchCityApi(getUserCity);
  
});

$('.city-div'). on ('click', '.btn-success', function(){
  
  addComment(this);

 });

$('.city-div').on('click', '.delete-city', function(){
  deleteCity(this);


});

loadAll();        //Load everything from the local storage on startup

$('.menu').dropit();