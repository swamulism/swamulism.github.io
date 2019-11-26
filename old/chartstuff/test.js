/*
Things to add

screen type:
graphs
width/height
format (how things are placed)

graphs:
color
data
type
animation
text options

*/

let generateRandomData = function() {
    const curMonth = Math.round(Math.random() * 7) + 3;
    const scale = 1000;
    let randomScalingFactor = function() {
        return Math.round(Math.random() * 15 * scale) + 10 * scale;
    };

    let changeALittle = function() {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 3 * scale);
    };

    let comparisonData = [randomScalingFactor()];
    let actualsData = [];
    let planData = [];

    for (var i = 1; i < 11; i++) {
        comparisonData.push(comparisonData[i - 1] + changeALittle());
    }

    for (let i = 1; i < 12; i++) {
        if (i < curMonth) {
            actualsData.push(comparisonData[i - 1] + changeALittle());
            planData.push(null);

        } else {
            planData.push(comparisonData[i - 1] + changeALittle());
            actualsData.push(null);
        }
    }
    return [comparisonData, actualsData, planData];
};

let ctx = document.getElementById("myChart");
let data = generateRandomData();
let chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];

let chartData = {
    type: "bar",
    data: {
        labels: chartLabels,
        datasets: [{
            label: "Comparison",
            data: data[0],
            fill: false,
            type: "line",
            lineTension: 0,
            borderWidth: 2,
            pointRadius: 4,
            borderColor: "rgb(140, 186, 255)",
            backgroundColor: "rgba(140, 186, 255, 1)"
        }, {
            label: "Actuals",
            data: data[1],
            borderColor: "rgb(17, 63, 137)",
            backgroundColor: "rgba(17, 63, 137, 1)"
        }, {
            label: "Plan",
            data: data[2],
            borderColor: "rgb(185, 194, 206)",
            backgroundColor: "rgba(185, 194, 206, 1)"
        }]
    },
    options: {
        legend: {
            labels: {
                usePointStyle: true
            },
            position: "bottom"
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                stacked: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        //if want k use this
                        if (value.length >= 3){
                            value = value.substring(0, value.length - 3) + "k";
                        }
                        else {
                            value = "0k";
                        }
                        //if want commas use this
                        /*
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        */
                        return value;
                    }
                },
                gridLines: {
                    display: true
                },
                stacked: true
            }]
        }
    }
};

let myChart = new Chart(ctx, chartData);
