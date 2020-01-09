(function () {

    // A multiple bar chart

    // The Model
    // The model abstraction is a matrix of categories: the main dimansion will define the groups,
    // and the secondary will define the single bars.
    // Optional dimension is on the bar chart color (to be defined).

    var model = raw.model();

    // Categories dimension. each category will define a bar
    // It can accept both numbers and strings
    var lat = model.dimension()
        .title('Latitude')
        .types(Number)
        .required(true)
    // Values dimension. It will define the height of the bars
    var lon = model.dimension()
        .title('Longitide')
        .types(Number)
        .required(true)

    // Group dimension.
    // It can accept both numbers and strings
    var groups = model.dimension()
        .title('Groups')
        .types(Number, String)
        .multiple(true)


    // Colors dimension. It will define the color of the bars
    var colorsDimesion = model.dimension()
        .title('Colors')
        .types(String)

    // Mapping function
    // For each record in the data returns the values
    // for the X and Y dimensions and casts them as numbers
    model.map(function (data) {
        var newData = []
        var results = d3.nest()
            .key(function (d) {
                return d[groups()]
            })
            .key(function (d) {
                return d[lat()]
            })
            .rollup(function (v) {
                return {
                    size: !lon() ? v.length : d3.sum(v, function (e) {
                        return e[lon()]
                    }),
                    category: lat(v[0]),
                    group: groups(v[0]),
                    color: colorsDimesion(v[0])
                }
            })
            .entries(data)

        // remap the array
        results.forEach(function (d) {
            d.values = d.values.map(function (item) {
                return item.value
            })
        })

        data.forEach((element) => {
            newData.push({ latitude: element[lat()], longitude: element[lon()] })
        })

        console.log('newdata', newData)
        //return results;
        return newData
    })


    // The Chart

    var chart = raw.chart()
        .title("India MAP ")
        .description("India Map TEST.")
        .category('Other/TEST')
        .model(model)

    // visualiziation options
    // Width
    var width = chart.number()
        .title('Width')
        .defaultValue(900)

    // Height
    var height = chart.number()
        .title('Height')
        .defaultValue(800)

    //left margin
    var marginLeft = chart.number()
        .title('Left Margin')
        .defaultValue(40)

    // Space between barcharts
    var padding = chart.number()
        .title('Vertical padding')
        .defaultValue(0);

    // Padding between bars
    var xPadding = chart.number()
        .title('Horizontal padding')
        .defaultValue(0.1);

    // Use or not the same scale across all the bar charts
    var sameScale = chart.checkbox()
        .title("Use same scale")
        .defaultValue(false)

    // Chart colors
    var colors = chart.color()
        .title("Color scale")

    // Drawing function
    // selection represents the d3 selection (svg)
    // data is not the original set of records
    // but the result of the model map function
    chart.draw(function (selection, data) {
        console.log(data)
        var newData = data
        selection
            .attr("width", width())
            .attr("height", height())

        var places = [
            {
                name: "1 Gorkha Rifles",
                nam: "https://en.wikipedia.org/wiki/1_Gorkha_Rifles",
                location: {
                    latitude: 30.975441,
                    longitude: 76.990228
                }
            },
            {
                name: "3 Gorkha Rifles",
                nam: "https://en.wikipedia.org/wiki/3_Gorkha_Rifles",
                location: {
                    latitude: 25.317645,
                    longitude: 82.973914
                }
            }
            ,
            {
                name: "5 Gorkha Rifles",
                nam: "https://en.wikipedia.org/wiki/5_Gorkha_Rifles",
                location: {
                    latitude: 25.578773,
                    longitude: 91.893254
                }
            }
            ,
            {
                name: "11 Gorkha Rifles",
                nam: "https://en.wikipedia.org/wiki/11_Gorkha_Rifles",
                location: {
                    latitude: 26.846694,
                    longitude: 80.946166
                }
            }
            ,
            {
                name: "Gharwal Rifles",
                nam: "https://en.wikipedia.org/wiki/Gharwal_Rifles",
                location: {
                    latitude: 29.837746,
                    longitude: 78.687107
                }
            }
            ,
            {
                name: "Brigade of the Guards",
                nam: "https://en.wikipedia.org/wiki/Brigade_of_the_Guards",
                location: {
                    latitude: 21.227531,
                    longitude: 79.190083
                }
            }
            ,
            {
                name: "Bihar Regiment",
                nam: "https://en.wikipedia.org/wiki/Bihar_Regiment",
                location: {
                    latitude: 25.620667,
                    longitude: 85.049325
                }
            }
            ,
            {
                name: "Parachute Regiment",
                nam: "https://en.wikipedia.org/wiki/Parachute_Regiment",
                location: {
                    latitude: 12.971599,
                    longitude: 77.594563
                }
            }
            ,
            {
                name: "Ramgarh Cantonment",
                nam: "https://en.wikipedia.org/wiki/Ramgarh_Cantonment",
                location: {
                    latitude: 23.633224,
                    longitude: 85.514874
                }
            }
            ,
            {
                name: "Madras Regiment",
                nam: "https://en.wikipedia.org/wiki/Madras_Regiment",
                location: {
                    latitude: 11.363560,
                    longitude: 76.788471
                }
            }
            ,
            {
                name: "Grenadiers Regiment",
                nam: "https://en.wikipedia.org/wiki/Grenadiers_Regiment",
                location: {
                    latitude: 23.181467,
                    longitude: 79.986407
                }
            }
            ,
            {
                name: "Maratha Light Infantry",
                nam: "https://en.wikipedia.org/wiki/Maratha_Light_Infantry",
                location: {
                    latitude: 15.849695,
                    longitude: 74.497674
                }
            },
            {
                name: "Rajputana Rifles",
                nam: "https://en.wikipedia.org/wiki/Rajputana_Rifles",
                location: {
                    latitude: 28.596128,
                    longitude: 77.158738
                }
            },
            {
                name: "Kumaon Regiment",
                nam: "https://en.wikipedia.org/wiki/Kumaon_Regiment",
                location: {
                    latitude: 29.643362,
                    longitude: 79.432182
                }
            }
            ,
            {
                name: "Sikh Light Infantry",
                nam: "https://en.wikipedia.org/wiki/Sikh_Light_Infantry",
                location: {
                    latitude: 27.367290,
                    longitude: 79.622137
                }
            }
        ]

        var color = d3.scaleOrdinal()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
            .range(colorbrewer.Oranges[9]);

        /*var projection = d3.geo.mercator()
          .scale(800)
          .translate([-500,600]);*/

        var projection = d3.geoMercator().scale(1100).translate([-1000, 800]);
        var path = d3.geoPath()
            .projection(projection);

        var svg = selection.append("g")
            .attr("viewBox", "0 0 900 800")
            .attr("preserveAspectRatio", "xMidYMid meet");
        var data;

        d3.json("test.json", (err, data) => {
        }).then((swiss) => {
            var cantons = topojson.feature(swiss, swiss.objects.india);

            //svg.call(tip);
            var group = svg.selectAll("g")
                .data(cantons.features)
                .enter()
                .append("g");
            //.on('mouseover', tip.show)
            //.on('mouseout', tip.hide)

/* 
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-5, 0])
                .style("left", "300px")
                .style("top", "400px")
                .html(function (d) {debugger
                    return ("<a href=#" + " target='_blank'>" + d.latitude + "</a>");
                }) */

          //  svg.call(tip);


            svg.selectAll(".pin")
                .data(newData)
                .enter().append("circle", ".pin")
                .attr("r", 5)
                .attr("transform", function (d) {
                    return "translate(" + projection([
                        d.longitude,
                        d.latitude
                    ]) + ")";
                })/* 
                .on('mouseover', tip.show)
                .on('click', tip.hide); */

            //var projection = d3.geo.mercator().scale(900).translate([-600,700]);
            var path = d3.geoPath().projection(projection);

            var areas = group.append("path")
                .attr("d", path)
                .attr("class", "area")
                .attr("fill", "steelblue");
        })
    })
})();
