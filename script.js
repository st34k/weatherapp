
var source = $('#weather-template').html();
var template = Handlebars.compile(source);


var searchCityApi = function (getUserCity){
  
  $.get("http://api.openweathermap.org/data/2.5/weather?q="+getUserCity+"&appid=d703871f861842b79c60988ccf3b17ec", function(city){
    
    console.log(getUserCity);


    var cityName = city.name;   //Get city name from the json

    var tempC = Math.round(city.main.temp - 273.15);          //Convert temp to Celsius
    var tempF = Math.round(city.main.temp * (9/5) -459.67);   //Convert temp to Fahrenheit
    var dateTime = new Date();                                //get search date

    var city = {
      cityName : cityName,
      tempC : tempC,
      tempF : tempF,
      dateTime : dateTime
    };

    var newHTML = template(city);

    $('.city-div').append(newHTML);
  });

    

}


function addComment (addCom){
  var getComment = $(addCom).closest('div').prev().find('#comment').val();
  $(".comments-display").append('<div id = "comm">' + getComment + '</div>');
};


$('.btn').on('click', function (e) {
  e.preventDefault();
  var getUserCity = $('#city').val();
  // var city = getUserCity.split(" ").join("+");
  searchCityApi(getUserCity);
  
});

$('.city-div'). on ('click', '.btn-success', function(){
  
  addComment(this);
  // console.log(getComment);
 });