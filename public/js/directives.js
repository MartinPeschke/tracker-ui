'use strict';

angular.module('mean.directives')
     .directive('d3Circles', ['d3', 'underscore', 'color', function(d3, _, color) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                intersect: '=',
                label: '@',
                onClick: '&'
            },
            link: function(scope, iElement) {
                var svg = d3.select(iElement[0])
                    .append('svg')
                    .attr('width', '100%');

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
                scope.$watch('data', function(newVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function(data){
                    svg.selectAll('*').remove();

                    var std_rad = 100,
                        height = 500,
                        fSize = 20,
                        total_width = d3.select(iElement[0])[0][0].offsetWidth,
                        center = {x:total_width/2, y:200, r: scope.intersect},
                        getX = function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length);
                        },
                        getY = function(d, i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length);
                        };

                    svg.attr('height', height);

                    svg.selectAll('circle')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('fill', function(d,i){
                            return color('#00FF00').shiftHue(i*90).toCSS();
                        })
                        .attr('fill-opacity', '.5')
                        .attr('r', std_rad)
                        .attr('id', Math.random())
                        .attr('cx', getX)
                        .attr('cy', getY)
                        .on('mouseover', function(d){
                            svg.selectAll("circle").sort(function (a, b) {
                                  if (a.id != d.id) return -1; else return 1;
                              });
                        }).on('mouseout', function(d){
                            var nodeSelection = d3.select(this).style('fill-opacity', '.5');
                        });

                    var texts = svg.selectAll('text').data(data).enter();

                    texts.append('text')
                        .attr('color', '#000000')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize/2+'px')
                        .attr('y', function(d,i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length) * 1.8 - .5 * fSize;
                        })
                        .attr('x', function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length) * 1.8;
                        })
                        .text(function(d){return d.title;});

                    texts.append('text')
                        .attr('color', '#000000')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('y', function(d,i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length) * 1.8 + .5 * fSize;
                        })
                        .attr('x', function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length) * 1.8;
                        })
                        .text(function(d){return d.score;});


                    texts.append('text')
                        .attr('color', '#000000')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('y', function(d,i){
                            return center.y + center.r/2 * Math.sin(2*Math.PI * i/data.length + Math.PI/3) * 1.8 + .5 * fSize;
                        })
                        .attr('x', function(d, i){
                            return center.x + center.r/2 * Math.cos(2*Math.PI * i/data.length + Math.PI/3) * 1.8;
                        })
                        .text(function(d){return d.intersect;});

                    svg.append('text')
                        .attr('color', '#000000')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('y', center.y + fSize/2)
                        .attr('x', center.x)
                        .text(function(d){return 100;});


                };
            }
        };
    }]);