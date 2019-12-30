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
        .title("Leaflet chart TEST")
        .description("Leaflet TEST.</br> Chart based on <a href='https://bl.ocks.org/mbostock/3310560'>https://bl.ocks.org/mbostock/3310560</a>")
        .category('Other/TEST')
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
        //document.getElementById("#chart").innerHTML = ""
        let newdata = data[0].values.map((element)=>{
            return element.size
        })
 
        let categoriesData = data[0].values.map((element)=>{
            return element.category
        })

       // console.log(data[0].values,newdata)

        // svg size
        selection
            .attr("width", width())
            .attr("height", height())
     
  try {
    var mymap = L.map('chart').setView([28.7041, 77.1025], 7);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFqZXNoNTcyIiwiYSI6ImNrMmcwMnRiNzBwcmczYnQ4aGxueGxoNmMifQ.OS0SIcgxFSWJrq9dJ6zj-A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoicmFqZXNoNTcyIiwiYSI6ImNrMmcwMnRiNzBwcmczYnQ4aGxueGxoNmMifQ.OS0SIcgxFSWJrq9dJ6zj-A'
}).addTo(mymap);
  }
  catch(e) {

  }
try {
    var marker = L.marker([28.7041, 77.1025]).addTo(mymap).on('mouseover',onC)
    function onC(e) {
        marker.bindTooltip(`${e.latlng}`).openTooltip();
    }
}
catch {

}

//marker.bindTooltip("my tooltip text").openTooltip();

    })
})();
