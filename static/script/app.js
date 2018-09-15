$(document).ready(function () {
    // Initialize Firebase
    var firebase_comparison_chart_handler = null;
    var firebase_comparison_feature = null;

    google.charts.load('current', {'packages': ['bar']});
    var classes = ["(0,500]", "(500,1e+03]", "(1e+03,1.5e+03]", "(1.5e+03,2e+03]", "(2e+03,2.5e+03]", "(2.5e+03,3e+03]", "(3e+03,3.5e+03]"
        , "(3.5e+03,4e+03]", "(4e+03,4.5e+03]", "(4.5e+03,5e+03]", "(5e+03,5.5e+03]", "(5.5e+03,6e+03]", "(6e+03,6.5e+03]", "(6.5e+03,7e+03]"
        , "(7e+03,7.5e+03]", "(7.5e+03,8e+03]", "(8e+03,8.5e+03]", "(8.5e+03,9e+03]"]
    var class_len = classes.length;

    function drawChart(data, keys) {
        var series = new Object();
        var x_axes = {};
        var axes = {x:x_axes};
        var key_len = keys.length;
        for (var key_index = 0; key_index < key_len; key_index++) {
            series[key_index] = {axis: keys[key_index]};
            x_axes[keys[key_index]] = {label:""};
        }
        x_axes[keys[0]] = {label:"Survivability (Percentage)"};
        var first_key = keys[0];
        var options = {
            chart: {
                title: 'Survivability by Group',
                subtitle: 'Select a Group at the Right',
            },
            titleTextStyle: {
                fontSize: 24, // 12, 18 whatever you want (don't specify px)
                bold: true,    // true or false
            },
            bars: 'horizontal', // Required for Material Bar Charts.
            series,
            axes
        };
        //hAxis:{title:"Survivability (Percentage)"}
        var chart = new google.charts.Bar(document.getElementById('graph'));

        chart.draw(google.visualization.arrayToDataTable(data), google.charts.Bar.convertOptions(options));
    }

        $("#feature_selection").click(function () {
            var selection = $("#feature_selection option:selected").val();
            if (selection !== "select") {
                if (firebase_comparison_chart_handler !== null) {
                    firebase.database().ref("LUSC_2/" + firebase_comparison_feature).off("value");
                }
                firebase_comparison_feature = selection;
                firebase_comparison_chart_handler = function (snapshot) {
                    var value = snapshot.val();
                    var keys = Object.keys(value);
                    var data = [["Survive Time (Days)"].concat(keys)];
                    for (var survive_time = 0; survive_time < class_len; survive_time++) {
                        var row = [classes[survive_time]];
                        Object.keys(value).forEach(function eachKey(key) {
                            row.push(value[key][survive_time]);
                        });
                        data.push(row);
                    }
                    $("#graph").height(20 * keys.length * class_len);
                    drawChart(data, keys);
                };
                firebase.database().ref("LUSC_2/" + firebase_comparison_feature).on("value", firebase_comparison_chart_handler);
            }
        });
    }
    );
