'use strict';

angular.module('mean.directives')
     .directive('d3Circles', ['d3', 'underscore', 'color', 'Point2D', 'Intersection', function(d3, _, color, Point2D, Intersection) {
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
                        center = {x:total_width/4, y:200, r: scope.intersect},
                        getX = function(d, i){
                            return center.x + center.r * Math.cos(2*Math.PI * i/data.length);
                        },
                        getY = function(d, i){
                            return center.y + center.r * Math.sin(2*Math.PI * i/data.length);
                        },
                        getIntersect = function(i){
                            var x1 = getX(null, i), y1 = getY(null, i)
                            , x2 = getX(null, i+1), y2 = getY(null, i+1)
                            , dX = x2 - x1
                            , dY = y2 - y1
                            , alpha = Math.atan(dX/dY)
                            , distance = Math.sqrt(dX*dX + dY*dY)
                            , b = Math.sqrt(std_rad*std_rad - distance*distance/4);
                            return Intersection.intersectCircleCircle(
                                    new Point2D(x1,y1), std_rad
                                    , new Point2D(x2,y2), std_rad
                                );
                        }
                        , getIntersectX = function(d, i){
                            return getIntersect(d,i).points[1].x;
                        }
                        , getIntersectY = function(d, i){
                            return getIntersect(d,i).points[1].y;
                        }
                        , simpleCircle = function(p, color){
                            svg.append("circle")
                                .attr("r", 5)
                                .attr('cx', p.x)
                                .attr('cy', p.y)
                                .attr("fill", color);

                        };

                    svg.attr('height', height);

                    var
                        centers = _.map([0,1,2], function(k,i){return new Point2D(getX(data[k], i), getY(data[k], i));})
                        , ip = _.map(data, function(d, i){return getIntersect(i).points;})
                        , allIntersects = _.flatten(ip)
                        , less = function(a, b){
                            if (a.x-center.x >= 0 && b.x-center.x < 0)
                                return true;
                            if (a.x-center.x == 0 && b.x-center.x == 0) {
                                if (a.y-center.y >= 0 || b.y-center.y >= 0)
                                    return a.y > b.y;
                                return b.y > a.y;
                            }
                            // compute the cross product of vectors (center -> a) x (center -> b)
                            var det = (a.x-center.x) * (b.y-center.y) - (b.x - center.x) * (a.y - center.y);
                            return det < 0;
                        }
                        , segments = [];

                    _.each(centers, function(cur_ctr, cur_idx, list){
                        var others = _.without(list, cur_ctr), tri={outers:[]};

                        _.each(allIntersects, function(el, idx){
                            var outsideOthers = _.reduce(others, function(memo, other){
                                return memo || (other.distanceFrom(el) - std_rad > 0.1);
                            }, false);

                            if(std_rad - cur_ctr.distanceFrom(el) > 0.1) tri.inner = el;
                            else if(Math.abs(std_rad - cur_ctr.distanceFrom(el))<0.1&&outsideOthers)tri.outers.push(el);
                        });
                        if(less(tri.outers[1], tri.outers[0]))tri.outers.reverse();
                        segments.push(tri)
                    });

                    var segment_1 = function (tri, i) {
                        return "M"+tri.outers[0].x+","+tri.outers[0].y +
                              "A"+std_rad+","+std_rad+",0,1,0,"+tri.outers[1].x+","+tri.outers[1].y +
                              "A"+std_rad+","+std_rad+",0,0,1,"+tri.inner.x+","+tri.inner.y +
                              "A"+std_rad+","+std_rad+",0,0,1,"+tri.outers[0].x+","+tri.outers[0].y
                    }
                    , segment_2 = function(tri, i){
                        var next = segments[(i+1)%segments.length],
                            path = "M"+tri.outers[0].x+","+tri.outers[0].y +
                                   "A"+std_rad+","+std_rad+",0,0,1,"+next.inner.x+","+ next.inner.y +
                                    "A"+std_rad+","+std_rad+",0,0,0,"+tri.inner.x+","+ tri.inner.y +
                                   "A"+std_rad+","+std_rad+",0,0,1,"+tri.outers[0].x+","+tri.outers[0].y;
                        return path;
                    }
                    , last = _.last(segments)
                    , segment_3 = "M"+last.inner.x+","+last.inner.y
                                + _.map(segments, function(tri, i){
                                    segment_3 += "A"+std_rad+","+std_rad+",0,0,1,"+tri.inner.x+","+tri.inner.y;
                                }).join("");

                    // paint segments 1, the outer sections

                    var paths = svg.selectAll("path").data(segments).enter();

                    paths.append("path")
                        .attr("d", segment_1)
                        .attr("stroke", "#000000")
                        .attr("stroke-width", 2)
                        .attr("fill", function(d, i){
                            return color('#00FF00').shiftHue(0 + i*50).toCSS();
                        })
                        .attr("fill-opacity", '0.5')
                        .on('mouseover', function(d){
                            var nodeSelection = d3.select(this).style('fill-opacity', '.8');
                        }).on('mouseout', function(d){
                            var nodeSelection = d3.select(this).style('fill-opacity', '.5');
                        });

                    paths.append("path")
                        .attr("d", segment_2)
                        .attr("stroke", "#000000")
                        .attr("stroke-width", 2)
                        .attr("fill", function(d, i){
                            return color('#00FF00').shiftHue(150 + i*50).toCSS();
                        })
                        .attr("fill-opacity", '0.5')
                        .on('mouseover', function(d){
                            var nodeSelection = d3.select(this).style('fill-opacity', '.8');
                        }).on('mouseout', function(d){
                            var nodeSelection = d3.select(this).style('fill-opacity', '.5');
                        });

                    // paint bulls eye

                    svg.append("path")
                        .attr("d", segment_3)
                        .attr("stroke", "#000000")
                        .attr("stroke-width", 2)
                        .attr("fill", "#ffffff");





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