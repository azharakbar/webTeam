var app =  angular.module('deviceLog', ['ngTable','ngRoute','ui.router']);
app.controller('deviceLogController',function($scope,$window, $http,NgTableParams,$stateParams) {
  var k = $stateParams.deviceId;
 $http({
  method: 'GET',
  url: 'http://54.251.44.26:4009/api/beaconhistory/'+k,
  headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAiLCJkZXZpY2VJZCI6IjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE0NzAzMDI3NjgsImV4cCI6MTQ3MDM4OTE2OH0.usJurYLbaz1KvhRsxN1vk7d7QMYXx0Kjl6WtWXqJ9EY'
}
})
  .then(function (response)  {
  	 $scope.logtable = new NgTableParams({page:2,count:10},{ dataset: response.data.result });
    //$window.location.assign('http://54.251.44.26:4009/api/alldetails')
    //$window.location.href('./deviceLogView.html')
    var xColumn = "beginTime";
        var yColumn = "batteryStatus";
        var xScale = d3.time.scale().range([0, 600]);
        var yScale = d3.scale.linear().range([450, 0]);
        var margin = {
            left: 50,
            right: 10,
            top: 30,
            bottom: 10
        };
        // var width = 960 - margin.left - margin.right,
        //     height = 550 - margin.top - margin.bottom;
        var width = 960 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;
        var svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxisG = g.append("g")
            .attr("transform", "translate(0, " + 450 + ")");
        var yAxisG = g.append("g");

        var path = g.append("path")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 5)
        
        path.attr("id", "myPath")
            .on("mouseover", function(){tooltip.style("visibility", "visible");})
            .on("mousemove", mMove)
            .on("mouseout", mOut);
        
        //Tooltip//
        var tooltip = d3.select("#graph")
            .append("div")
            .attr("class", "circleBase type")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden");
        
        
        function mOut(){
            tooltip.style("visibility", "hidden");
            path.style("stroke", "steelblue").style("stroke-width", "3")
            }
        function mMove(){
            console.log(d3.event)
            var m = d3.mouse(this);
            path.style("stroke", "steelblue")
                .style("stroke-width", "6")
              console.log("X: ",d3.event.pageX + m[0], "Y: ", d3.event.pageY + m[1]);
            tooltip.style("top", (m[1] + 250)+"px").style("left",(m[0] + 55)+"px");
            tooltip.style("padding", "4")
            tooltip.text(Math.round(yScale.invert(m[1])));
        }
        
        var line = d3.svg.line()
            .interpolate("linear")
            .x(function (d) {
                return xScale(new Date(d[xColumn]));
            })
            .y(function (d) {
                return yScale(d[yColumn]);
            });

        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(7).tickFormat(d3.time.format('%a'));
        var yAxis = d3.svg.axis().scale(yScale).orient("left");

        function render(data) {
            var xExtent = d3.extent(data, function (d) {
                return new Date(d[xColumn]);
            });
//            var yExtent = d3.extent(data, function (d) {
//                return d[yColumn];
//            });
//            console.log(xExtent, yExtent);
            xScale.domain(xExtent);
            yScale.domain([0, 100]);
            xAxisG.call(xAxis);
            yAxisG.call(yAxis);

            path.attr("d", line(data));
        }
        
        d3.json("http://54.251.44.26:4009/api/logs", function (data) {
                render(data.result);
		var totalLength = path.node().getTotalLength();
		path.attr("stroke-dasharray", totalLength)
		    .attr("stroke-dashoffset", -totalLength)
		.transition()
			.duration(800)
			.ease("linear")
			.attr("stroke-dashoffset", 0);
            })
            .header("Content-type", "application/json")
            .send("POST", JSON.stringify({
                deviceId: k
            }));
	});
 

});
