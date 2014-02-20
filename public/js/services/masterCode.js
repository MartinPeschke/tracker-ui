'use strict';

angular.module('trackerui.system').factory('masterCodeService',
    function() {
        return '<script>(function (i, s, o, g, r, a, m) {i[\'HNCWebTrckrObject\'] = r;i[r] = i[r] || function () {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m)}  )(window, document, \'script\', \'/t.js\', \'_hnc\'); _hnc(\'create\', \'FRIENDFUND\', \'friendfund.com\');</script>';
    }
);