// create function
async function main() {

    // Read the JSON file
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);

    // Grabbing your values
    // Pull out just the samples
    let dataSamples = data.samples
    console.log(dataSamples);

    // Pull out IDs
    var IDs = dataSamples.map(function(obj)
    {
        var key = Object.keys(obj).sort()[0], rtn = {};
        return rtn[key] = obj[key], rtn;
    });
    console.log(IDs);

    // Pull out otu_ids 
    var otu_ids = dataSamples.map(function(obj)
    {
        var key = Object.keys(obj).sort()[1], rtn = {};
        return rtn[key] = obj[key], rtn;
    });
    console.log(otu_ids);

    // Pull out sample_labels
    var otu_labels = dataSamples.map(function(obj)
    {
        var key = Object.keys(obj).sort()[2], rtn = {};
        return rtn[key] = obj[key], rtn;
    });
    console.log(otu_labels);

    // Pull out sample_values
    var sample_values = dataSamples.map(function(obj)
    {
        var key = Object.keys(obj).sort()[3], rtn = {};
        return rtn[key] = obj[key], rtn;
    });
    console.log(sample_values);

    // Sorted sample values in ascending order
    let sortedSampleValues = dataSamples.sort(function(a, b) {
        return parseFloat(a.sample_values.length) - parseFloat(b.sample_values.length);
    });
    console.log(sortedSampleValues);

    // Reverse the sorted sample values to make it descending order
    descendingSampleValues = sortedSampleValues.reverse()
    console.log(descendingSampleValues);

    // Slice out the top 10 items on that descending list
    slicedData = descendingSampleValues.slice(0,10);
    console.log(slicedData);

    // Adding your x and y axis 
    let trace1 = {
        x: slicedData.map(object => object.sample_values.slice(0,10)),
        y: slicedData.map(object => object.otu_ids.slice(0,10)),
        text: slicedData.map(object => object.otu_labels.slice(0,10)),
        type: "bar",
        orientation: "h" 
    }

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
        title: "Bellybutton Biodiversity",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
  };
  
    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bar", traceData, layout);

    // Bubble Chart
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values, 
            text: otu_labels,
        },
    }

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    var traceData2 = [trace2];

    // Apply a title to the layout
    var layout2 = {
        title: "Sample Size per OTU",
        xaxis: {
        title:'OTU ID'},
    };

    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bubble", traceData2, layout2);

}

// Add event listener for the Demographic Information
 
// Add array of IDs
    const subjectID = Object.values(dataSamples.id);

// Create an array of demographic information
    const demographicInfo = Object.keys(dataSamples);

  // On change to the DOM
  document.querySelector("#selDataset").addEventListener("change", event => {
      console.log(this.value)
      console.log()
    
    // Initialize an empty array for the country's data
  let data = [];

  if (event.target.value == 'us') {
      data = us;
  }
  else if (event.target.value == 'uk') {
      data = uk;
  }
  else if (event.target.value == 'canada') {
      data = canada;
  }

  Plotly.restyle("pie", "values", [data]);
});

main()







   // // Sort the data for OTUs
    // let sortedByTopTen = dataSamples.sort(function sortFunction(a, b) {
    //     return b.sample_values - a.sample_values;
    //   });
    // console.log(sortedByTopTen);
    // // Slice out the top 10 OTUs
    // slicedData = sortedByTopTen.slice(0,10);
    // console.log(slicedData);
    // // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse()
    // console.log(reversedData);

    // let yticks = otu_ids.slice(0,10).map(otuID => `otu ${otuID}`).reverse();
    // let traceDataThree = [{
    //     y: yticks, 
    //     x: sample_values.slice(0,10).reverse(),
    //     type: "bar",
    //     orientation: "h"
    // }]