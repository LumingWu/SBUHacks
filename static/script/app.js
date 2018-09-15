$(document).ready(function(){
    // Initialize Firebase
    firebase.database().ref("chart").on("value", function(snapshot){
        var value = snapshot.val();
        var line_len = value.length;
        var new_data = [];
        for(var i = 0; i < line_len; i++){
            var line = value[i];
            var line_coordinates = line.coordinates;
            var coordinates_len = line_coordinates.length;
            var coordinate_list = [];
            for(var j = 0; j < coordinates_len; j++){
                var line_coordinate = line_coordinates[j];
                coordinate_list.push({"x": line_coordinate[0], "y": line_coordinate[1]});
            }
            new_data.push({
                type: "line",
                axisYType: "secondary",
                name: line["abel"],
                showInLegend: true,
		        markerSize: 0,
                dataPoints: coordinate_list
            });
        }
        chart.options.data = new_data;
        chart.render();
    });

    var chart = new CanvasJS.Chart("graph", {
        zoomEnabled: true,
	    zoomType: "xy",
        exportEnabled: true,
        title: {
		    text: "Survival Time By Group"
	    },
        axisX: {
		    title: "Time Spent"
	    },
        axisY2: {
            title: "Survivability"
        },
        legend: {
            cursor: "pointer",
		    verticalAlign: "top",
		    horizontalAlign: "center",
		    dockInsidePlotArea: true
        }
    });

    $("#feature_selection").click(function(){
        $.post("/chart", {group: $(this).val()});
    });
});
