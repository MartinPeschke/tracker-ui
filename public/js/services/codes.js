'use strict';

angular.module('trackerui.system').factory('codeService',
    function() {
        return {
            getMasterCode: function(platform){
                return '<script>(function (i, s, o, g, r, a, m) {i[\'HNCWebTrckrObject\'] = r;i[r] = i[r] || function () {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m)}  )(window, document, \'script\', \'/t.js\', \'_hnc\'); _hnc(\'create\', \'FRIENDFUND\', \'friendfund.com\');</script>';
            },
            getEventCode: function(eventName, platform){
                return Math.floor(Math.random()*100)+ ' This is a code snippet for platform ' + platform + ' for event '+ eventName;
            }
        }
    }
);