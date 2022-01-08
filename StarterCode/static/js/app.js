// create function
async function main() {

    // Read the JSON file
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);

    // CREATE A WAY TO SELECT YOUR BIODIVERSITY ID NAMES //

    // Break out the names field from the JSON into an array
    let names = Object.values(data.names);

    // loop through all the names
    for (i=0; i<names.length; i++) {

        // create element for the field which is being updated (essentially a blank dropdown)
        const blankDropdown = document.createElement('option');
        // create an attribute to populate the field created (allow for the dropdown to be filled)
        const dropdownValue = document.createAttribute('value')

        // fill in the dropdown with a name
        blankDropdown.textContent = names[i];
        // have that name tied to specific value
        dropdownValue.value = names[i];

        // create a new option
        document.querySelector("#selDataset").append(blankDropdown);
        // create a new attribute
        blankDropdown.setAttributeNode(dropdownValue)

    };

    // Lead off the page with one sample
    displaySample(0);

    // LOAD YOUR GRAPHS //

    // 
    function displaySample(valueSel) {
        let indexSel = 0;
        for (let i=0; i<names.length; i++) {
            if (data.samples[i].id === valueSel) {
                indexSel = i;
            }
        }

        let sample_values = Object.values(data.samples[indexSel].sample_values);
        let otu_labels = Object.values(data.samples[indexSel].otu_labels);
        let otu_ids = Object.values(data.samples[indexSel].otu_ids);      

        let out_ids_labeled = otu_ids.map(id => "OTU " + id);
        let metadataStrings = (Object.entries(data.metadata[indexSel]))
            .map(item => `${item[0]} : ${item[1]}`);

        
    // Adding your x and y axis 
        let trace1 = [{
            x: sample_values.slice(0,10).reverse(),
            y: out_ids_labeled.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h" 
        }];

        const layout1 = {
            title: '10 Most Frequently Occuring OTUs'
        };

        Plotly.newPlot('bar', trace1, layout1)

    // Bubble Chart
    let trace2 = [{
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values, 
            text: otu_labels,
        }
    }];

    // Apply a title to the layout
    let layout2 = {
        title: "Sample Size per OTU",
        xaxis: {
        title:'OTU ID',
        },
    };

    Plotly.newPlot('bubble', trace2, layout2);

    let oldMeta = document.querySelectorAll('#meta');
    for (let i=0; i<oldMeta.length;i++) {
        oldMeta[i].remove();
    }


    metadataStrings.map(item => {
        let newP = document.createElement('p');
        newP.textContent =item;
        newP.id = "meta";
        document.querySelector('.panel-body').appendChild(newP);
    });

    }

}

main()


    // Question: what is the dropdownValue.value doing?
    // Question: why are we calling these 'option' and 'value' in lines 18 & 20?
    // Question: what is an attributeNode?
    // Question: what is this displaySample(0)? I get why we do it, just what is it?
    // BIG QUESTION: How do I get the Demographic Info to update based on the dropdown changing?


