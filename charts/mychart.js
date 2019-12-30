(function() {

    // A multiple bar chart

    // The Model
    // The model abstraction is a matrix of categories: the main dimansion will define the groups,
    // and the secondary will define the single bars.
    // Optional dimension is on the bar chart color (to be defined).

    var model = raw.model();

    // Categories dimension. each category will define a bar
    // It can accept both numbers and strings
    var categories = model.dimension()
        .title('X Axis')
        .types(Number, String)
        .required(true)
    // Values dimension. It will define the height of the bars
    var sizes = model.dimension()
        .title('Height')
        .types(Number)

    // Group dimension.
    // It can accept both numbers and strings
    var groups = model.dimension()
        .title('Groups')
        .types(Number, String)


    // Colors dimension. It will define the color of the bars
    var colorsDimesion = model.dimension()
        .title('Colors')
        .types(String)

    // Mapping function
    // For each record in the data returns the values
    // for the X and Y dimensions and casts them as numbers
    model.map(function(data) {

        var results = d3.nest()
            .key(function(d) {
                return d[groups()]
            })
            .key(function(d) {
                return d[categories()]
            })
            .rollup(function(v) {
                return {
                    size: !sizes() ? v.length : d3.sum(v, function(e) {
                        return e[sizes()]
                    }),
                    category: categories(v[0]),
                    group: groups(v[0]),
                    color: colorsDimesion(v[0])
                }
            })
            .entries(data)

        // remap the array
        results.forEach(function(d) {
            d.values = d.values.map(function(item) {
                return item.value
            })
        })

        return results;
    })


    // The Chart

    var chart = raw.chart()
        .title("Bar chart TEST")
        .description("A bar chart or bar graph is a chart or graph that presents grouped data with rectangular bars with heights proportional to the values that they represent.</br> Chart based on <a href='https://bl.ocks.org/mbostock/3310560'>https://bl.ocks.org/mbostock/3310560</a>")
        .category('Other')
        .model(model)

    // visualiziation options
    // Width
    var width = chart.number()
        .title('Width')
        .defaultValue(800)

    // Height
    var height = chart.number()
        .title('Height')
        .defaultValue(600)

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
    chart.draw(function(selection, data) {
        let newdata = data[0].values.map((element)=>{
            return element.size
        })
 
        let categoriesData = data[0].values.map((element)=>{
            return element.category
        })

        console.log(data[0].values,newdata)

        // svg size
        selection
            .attr("width", width())
            .attr("height", height())


            
var data = [10, 20, 100];

var width1 = 760,
    height1 = 500,
    radius1 = Math.min(width1, height1) / 2;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

var arc = d3.arc()
    .outerRadius(radius1 - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius1 - 40)
    .innerRadius(radius1 - 40);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; });

var svg = selection.append("g")
    .attr("width", width1)
    .attr("height", height1)
  .append("g")
    .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(newdata))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });

  g.append("text")
      .attr("transform", function(d) {
          console.log('ddd',d); return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; });

    })
})();
