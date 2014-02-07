'use strict';

angular.module('trackerui.directives')
     .directive('d3Circles', ['$window', 'd3', 'underscore', 'color', 'Point2D', 'Intersection', function($window, d3, _, color, Point2D, Intersection) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                label: '@',
                onClick: '&'
            },
            link: function(scope, iElement) {
                var svg = d3.select(iElement[0])
                    .append('svg')
                    .attr('width', '100%'),
                    rerender = function(){
                        return scope.render(scope.data, scope.intersect, scope.stdrad);
                    };

                // on window resize, re-render d3 canvas
                $window.onresize = function() {
                    return scope.$apply();
                };
                scope.$watch(function(){
                        return angular.element($window)[0].innerWidth;
                    }, rerender);

                // define render function
                scope.render = function(data){
                    var height = $window.innerHeight * 3/4,
                        fSize = height / 12,
                        stdrad = height * 2/5,
                        intersection = stdrad * 3/5;
                    if(intersection >= stdrad) {return;}

                    svg.selectAll('*').remove();

                    var
                        total_width = d3.select(iElement[0])[0][0].offsetWidth,


                        center = {x:total_width/2, y:height*2/5, r: intersection},
                        getX = function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length + 1/2);
                        },
                        getY = function(d, i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length + 1/2);
                        },
                        getIntersect = function(i){
                            var x1 = getX(null, i), y1 = getY(null, i),
                                x2 = getX(null, i+1), y2 = getY(null, i+1);
                            return Intersection.intersectCircleCircle(new Point2D(x1,y1), stdrad, new Point2D(x2,y2), stdrad);
                        };

                    svg.attr('height', height);

                    var svg_center = new Point2D( center.x, center.y),
                        centers = _.map([0,1,2], function(k,i){return new Point2D(getX(data[k], i), getY(data[k], i));}),
                        ip = _.map(data, function(d, i){return getIntersect(i).points;}),
                        allIntersects = _.flatten(ip),
                        less = function(a, b){
                            if (a.x-center.x >= 0 && b.x-center.x < 0)
                                return true;
                            if (a.x-center.x === 0 && b.x-center.x === 0) {
                                if (a.y-center.y >= 0 || b.y-center.y >= 0)
                                    return a.y > b.y;
                                return b.y > a.y;
                            }
                            // compute the cross product of vectors (center -> a) x (center -> b)
                            var det = (a.x-center.x) * (b.y-center.y) - (b.x - center.x) * (a.y - center.y);
                            return det < 0;
                        },
                        segments = _.map(centers, function(center, cur_idx, list){
                            var others = _.without(list, center), tri={outers:[]};

                            _.each(allIntersects, function(el){
                                var outsideOthers = _.reduce(others, function(memo, other){
                                    return memo || (other.distanceFrom(el) - stdrad > 0.1);
                                }, false);

                                if(stdrad - center.distanceFrom(el) > 0.1) tri.inner = el;
                                else if(Math.abs(stdrad - center.distanceFrom(el))<0.1&&outsideOthers)tri.outers.push(el);
                            });
                            if(less(tri.outers[1], tri.outers[0]))tri.outers.reverse();
                            return tri;
                        });
                    var segment_1 = function (d, i) {
                        var tri = segments[i],
                            c = svg_center.distanceFrom(tri.outers[0]),
                            b = tri.outers[0].distanceFrom(tri.outers[1]) / 2,
                            larger_ellipse = svg_center.distanceFrom(centers[i]) > Math.sqrt( c*c - b*b) ? 1 : 0;

                        return 'M'+tri.outers[0].x+','+tri.outers[0].y +
                              'A'+stdrad+','+stdrad+',0,'+larger_ellipse+',0,'+tri.outers[1].x+','+tri.outers[1].y +
                              'A'+stdrad+','+stdrad+',0,0,1,'+tri.inner.x+','+tri.inner.y +
                              'A'+stdrad+','+stdrad+',0,0,1,'+tri.outers[0].x+','+tri.outers[0].y;
                    },
                    segment_2 = function(d, i){
                        var tri = segments[i],
                            next = segments[(i+1)%segments.length];
                        return 'M'+tri.outers[0].x+','+tri.outers[0].y +
                                   'A'+stdrad+','+stdrad+',0,0,1,'+next.inner.x+','+ next.inner.y +
                                    'A'+stdrad+','+stdrad+',0,0,0,'+tri.inner.x+','+ tri.inner.y +
                                   'A'+stdrad+','+stdrad+',0,0,1,'+tri.outers[0].x+','+tri.outers[0].y;
                    },
                    last = _.last(segments),
                    segment_3 = 'M'+last.inner.x+','+last.inner.y +
                            _.map(segments, function(tri){
                                return 'A'+stdrad+','+stdrad+',0,0,1,'+tri.inner.x+','+tri.inner.y;
                            }).join('');

                    var groups = svg.selectAll('g').data(data).enter();

// ================ paint segments 1, the outer sections
                    var segment_1_groups = groups.append('g');
                    segment_1_groups.append('path')
                            .attr('d', segment_1)
                            .attr('stroke', '#000000')
                            .attr('stroke-width', 2)
                            .attr('fill', function(d, i){
                                return color('#00FF00').shiftHue(0 + i*50).toCSS();
                            })
                            .attr('fill-opacity', '0.5');
                    segment_1_groups.append('text')
                            .attr('fill', '#ffffff')
                            .attr('text-anchor', 'middle')
                            .attr('font-size', fSize/3+'px')
                            .attr('y', function(d,i){
                                return center.y + center.r * Math.sin(2*Math.PI * i/data.length + 1/2) * 1.5 - fSize/3;
                            })
                            .attr('x', function(d, i){
                                return center.x + center.r * Math.cos(2*Math.PI * i/data.length + 1/2) * 1.5;
                            })
                            .text(function(d){return d.title;});
                    segment_1_groups.append('text')
                        .attr('fill', '#ffffff')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('y', function(d,i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length + 1/2) * 1.5 + fSize/2;
                        })
                        .attr('x', function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length + 1/2) * 1.5;
                        })
                        .text(function(d){return d.score;});
                    segment_1_groups.on('mouseover', function(){
                            d3.select(this).selectAll('path').style('fill-opacity', '.8');
                        }).on('mouseout', function(){
                            d3.select(this).selectAll('path').style('fill-opacity', '0.5');
                        });

// ================ paint segments 2, the 2-circle intersections
                    var segment_2_groups = groups.append('g');
                    segment_2_groups.append('path')
                        .attr('d', segment_2)
                        .attr('stroke', '#000000')
                        .attr('stroke-width', 2)
                        .attr('fill', function(d, i){
                            return color('#00FF00').shiftHue(150 + i*50).toCSS();
                        })
                        .attr('fill-opacity', '0.5');
                    segment_2_groups.append('text')
                        .attr('fill', '#ffffff')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('y', function(d,i){
                            return center.y + center.r/2 * Math.sin(2*Math.PI * i/data.length + 1/2 + Math.PI/3) * 2.4 + fSize/2;
                        })
                        .attr('x', function(d, i){
                            return center.x + center.r/2 * Math.cos(2*Math.PI * i/data.length + 1/2 + Math.PI/3) * 2.4;
                        })
                        .text(function(d){return d.intersect;});
                    segment_2_groups.on('mouseover', function(){
                            d3.select(this).selectAll('path').style('fill-opacity', '.8');
                        }).on('mouseout', function(){
                            d3.select(this).selectAll('path').style('fill-opacity', '0.5');
                        });

// ================ paint bulls eye
                    var bullsEyeGroup = svg.append('g');
                    bullsEyeGroup.append('path')
                        .attr('d', segment_3)
                        .attr('stroke', '#000000')
                        .attr('stroke-width', 2)
                        .attr('fill', '#ffffff');
                    bullsEyeGroup.append('text')
                        .attr('fill', '#000000')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', fSize+'px')
                        .attr('x', center.x)
                        .attr('y', center.y + fSize/2)
                        .text('100');
                    bullsEyeGroup.on('mouseover', function(){
                        d3.select(this).selectAll('path').style('fill', '#dddddd');
                    }).on('mouseout', function(){
                        d3.select(this).selectAll('path').style('fill', '#ffffff');
                    });

// ================ debugging circle
//                 svg.append("circle")
//                  .attr("cy", centers[0].y)
//                  .attr("cx", centers[0].x)
//                  .attr("r", stdrad);
                };
            }
        };
    }]);