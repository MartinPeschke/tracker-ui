'use strict';

angular.module('mean.directives')
     .directive('d3Circles', ['d3', 'underscore', 'color', function(d3, _, Color) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0])
                    .append("svg")
                    .attr("width", "100%");

                // on window resize, re-render d3 canvas
                window.onresize = function() {
                    return scope.$apply();
                };
                scope.$watch(function(){
                        return angular.element(window)[0].innerWidth;
                    }, function(){
                        return scope.render(scope.data);
                    }
                );

                // watch for data changes and re-render
                scope.$watch('data', function(newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function(data){
                    svg.selectAll("*").remove();

                    var std_rad = 100
                        , max = Math.max.apply(Math, _.pluck(scope.data, 'score'))
                        , total_width = d3.select(iElement[0])[0][0].offsetWidth
                        , radius = (total_width - 10*scope.data.length) / scope.data.length
                        , height = 500;

                    svg.attr('height', height);

                    svg.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("fill", function(d,i){
                            return Color("#00FF00").shiftHue(i*90).toCSS();
                        })
                        .attr("fill-opacity", ".5")
                        .attr("r", std_rad)
                        .attr("cx", function(d, i){
                            return total_width / 2 - (i-1)*std_rad/1.5;
                        })
                        .attr("cy", function(d,i){
                            return std_rad * 2 + Math.abs((i-1)*std_rad*1.2)
                        });

                };
            }
        };
    }]);