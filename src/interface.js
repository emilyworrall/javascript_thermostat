$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  displayWeather('England/London');

  $('#temp-up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temp-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temp-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#psm-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving').text('on')
    updateTemperature();
  });

  $('#psm-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving').text('off')
    updateTemperature();
  });

  $('#current-city').change(function(event) {
    var city = $('#current-city').val();
    displayWeather(city);
  });

  function displayWeather(city) {
    var url1 = 'http://api.wunderground.com/api/';
    var token = '0e4f8aaf85ce8971';
    var url2 = '/conditions/q/' + city + '.json';
    $.get(url1 + token + url2, function(data) {
      $('#location').text(data.current_observation.display_location.full);
      $('#current-temp').text(data.current_observation.temp_c);
      $('#conditions').text(data.current_observation.weather);
    });
  };

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  };

});
