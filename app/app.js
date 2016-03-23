global.jQuery = require('jquery');
require('angular');
var _ = require('lodash');
require('angular-simple-logger');
require('angular-google-maps');
require('bootstrap');
require('./app.css');

var mainController = require('./controllers/MainController');
var utils = require('./services/Utils');
var placesService = require('./services/PlacesService');
var navBar = require('./directives/NavBar');
var autoCompleteSearch = require('./directives/AutoCompleteSearch');
var mapMarker = require('./directives/MapMarker');
var rating = require('./directives/Rating');
var placeDetail = require('./directives/PlaceDetail');

var app = angular.module('app', ['uiGmapgoogle-maps', 'nemLogging']) //FIXME: hacky solution to make angular map work
.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCfESWm35cHFZqoLeRrOUSLjuqHPsnanlE&',
        v: '3.20',
        libraries: 'weather,geometry,visualization,places'
    });
})

app.factory('Utils', utils);
app.factory('PlacesService', ['$rootScope', placesService]);

app.directive('autoCompleteSearch', ['PlacesService', 'uiGmapIsReady', autoCompleteSearch])
app.directive('navBar', ['PlacesService', navBar]);
app.directive('mapMarker',['$compile', mapMarker]);
app.directive('placeDetail', placeDetail);
app.directive('rating', rating);

app.controller('MainController', ['$scope','uiGmapGoogleMapApi', 'uiGmapIsReady', 'Utils','PlacesService', mainController]);
