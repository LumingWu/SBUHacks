$(document).ready(function () {
        // Initialize Firebase
        var firebase_comparison_chart_handler = null;
        var firebase_comparison_feature = null;

        google.charts.load('current', {'packages': ['bar']});

        function drawChart(data) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses', 'Profit'],
                ['2014', 1000, 400, 200],
                ['2015', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]
            ]);

            var options = {
                chart: {
                    title: 'Survivability by Group',
                    subtitle: 'Select a Group ->',
                },
                bars: 'horizontal' // Required for Material Bar Charts.
            };

            var chart = new google.charts.Bar(document.getElementById('graph'));

            chart.draw(data, google.charts.Bar.convertOptions(options));
        }

        $("#feature_selection").click(function () {
            var selection = $("#feature_selection option:selected").val();
            if (selection !== "select") {
                if (firebase_comparison_chart_handler !== null) {
                    firebase.database().ref("comparison_chart/" + firebase_comparison_feature).off("value");
                }
                firebase_comparison_feature = selection;
                firebase_comparison_chart_handler = function (snapshot) {
                    var value = snapshot.val();
                    alert(value);
                    var line_len = value.length;
                    var new_data = [];
                    for (var i = 0; i < line_len; i++) {
                        var line = value[i];
                        var line_coordinates = line.coordinates;
                        var coordinates_len = line_coordinates.length;
                        var coordinate_list = [];
                        for (var j = 0; j < coordinates_len; j++) {
                            var line_coordinate = line_coordinates[j];
                            coordinate_list.push({"x": line_coordinate[0], "y": line_coordinate[1]});
                        }
                        new_data.push({
                            type: "line",
                            axisYType: "secondary",
                            name: line.label,
                            showInLegend: true,
                            markerSize: 0,
                            dataPoints: coordinate_list
                        });
                    }
                    console.log(JSON.stringify(new_data));
                    chart.options.data = new_data;
                    chart.render();
                }
                firebase.database().ref("comparison_chart/" + firebase_comparison_feature).on("value", firebase_comparison_chart_handler);
            }
        });


    }
);
