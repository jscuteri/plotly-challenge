// create function
async function main() {

    // Read the JSON file
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);
}

    //Horizontal Bar Chart

    // Grabbing your values
    // Sort the data for OTUs
    let sortedByTopTen = data.sort((a, b) => b.sample_values - a.sample_values)
    // Slice out the top 10 OTUs
    slicedData = sortedByTopTen.slice(0,10);
    // Reverse the array to accommodate Plotly's defaults
    reversedData = slicedData.reverse()

    // Adding your x and y axis labels
    let trace1 = {
        x: reversedData.map(object => object.sample_values),
        y: reversedData.map(object => object.otu_ids),
        text: reversedData.map(object => object.otu_labels),
        type: "bar",
        orientation: "h" 
    }

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
        title: "Bellybutton Biodiversity",
  };
  
    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bar", traceData, layout);

    // Bubble Chart
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values,
        },
    }

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData2 = [trace2];

    // Apply a title to the layout
    let layout2 = {
        title: "Sample Size per OTU",
        xaxis: {
            title:'OTU ID',
        }
    };

    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bubble", traceData2, layout2);

main();