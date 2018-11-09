var table; //to load table
var Co2Data;
var Co2DataFiltered = [];
var counter = 0; //the vital counter that make the picture move!

function preload() {
  table = loadTable('Dataviz/CO2.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 900);
  //Slow down the annimation
  frameRate(10);
  //
  print("the number of rows in this data table: ", table.getRowCount())
  print(table.getColumn("CO2_filled_ppm"))

  //to convert the data from csv to JSON so as to easilly access the data
  Co2Data = table.getObject();

  // print it out to see what's inside
  print(Co2Data)

  for (var i = 0; i < Object.keys(Co2Data).length - 1; i++) {
    // to convert the co2 data from a string to a floating type
    var convertedCo2String = float(Co2Data[i].CO2_filled_ppm)
    // to filter the data by removing values that are unrealistic or specifically showing null values. 
    //In this case, the threshold number is 200
    if (convertedCo2String > 200) {
      Co2DataFiltered.push(Co2Data[i]);
    }

  }
  //to see if that works
  print("original data was this long: ", Object.keys(Co2Data).length)
  print("filtered data is this long: ", Co2DataFiltered.length)
}

function draw() {
  // to change the background color as the ppm change
  var co2val = int(Co2DataFiltered[counter].CO2_filled_ppm);
  var colb = map(co2val, 300, 400, 255, 100);
  background(colb);

  //Present the static information
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  text('Monthly CO2 PPM @ Mauna Loa Observatory', width / 2, height / 12);
  textSize(17);
  text('1958 - 2018', width / 2, height / 8);
  text('by Jisheng Chen', width / 2, height - 40);

  //to draw the circle
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(width / 2, height / 2, co2val, co2val);
  strokeWeight(1);

  //to show the animated numbers
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(Co2DataFiltered[counter].Mn + " / " + Co2DataFiltered[counter].Yr, width / 2, height * 0.8);
  text(Co2DataFiltered[counter].CO2_filled_ppm, width / 2, height / 2);
  if (counter < Co2DataFiltered.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
}