'use strict';

angular.module('trackerui.system').controller('SigninController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.submit = function(form){
        console.log(arguments);
        return false;
    };
}]);