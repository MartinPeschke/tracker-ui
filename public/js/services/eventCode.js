'use strict';

angular.module('trackerui.system').factory('eventCodeService',
    function() {
        return{

            createCodeSnippet: function(eventName, platform){
                return Math.floor(Math.random()*100)+ ' This is a code snippet for platform ' + platform + ' for event '+ eventName;
            }
        };
    }
);