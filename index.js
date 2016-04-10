// You can think of a d3 selection as a 2d array.
// selection  ->8  group  ->8  element

// d3.select(...) just gets you a single group, and a single element

// selection.selectAll(...) uses a group for each element


// 1. d3.datum(data) binds data to each node
d3.select('body') // So here, selection has a single group (window.document), which has a single element (body)
  .datum(42) // We bind data to the element (so at this point, $('body')[0].__data__ == 42)
  .append('h1') // Selection is switched to include a single h1, and data is rebound (so at this point, $('body h1')[0].__data__ = 42)
  .text(function(d) { return d; }) // set the text of the h1
;



// 2. d3.data(data) binds data per group
var data = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f']
];

var selection = d3.select('table')
  .selectAll('tr')
      .data(data) // bind data (per group - although the data is bound at element level)
                  // at this point we have one group (parentNode = table), with 2 elements
  .enter()
    .append('tr')
    .selectAll('td')
    .data(function(d) { return d; }) // at this point selection has two groups (parentNode = tr), each with two elements
    .enter()
      .append('td')
      .text(function(d) { return d; })



// 3. The "general update" pattern
var letters = [
  {name: "A", frequency: .08167},
  {name: "B", frequency: .01492},
  {name: "C", frequency: .02780},
  {name: "D", frequency: .04253},
  {name: "E", frequency: .12702}
];

var letters2 = [
  {name: "C", frequency: .08167},
  {name: "A", frequency: .01492},
  {name: "X", frequency: .02780},
  {name: "Y", frequency: .04253},
  {name: "Z", frequency: .12702}
];

function name(d) { // key function
  return d.name;
}

d3.select('div')
  .selectAll('p')
  .data(letters)
  .enter()
    .append('p')
    .text(function(d) { return d.name;})

// rebind with different data
var letter = d3.select('div')
  .selectAll('p')
  .data(letters2, name)
;

// update
letter.attr('class', 'update')

// enter
letter.enter().append('p').attr('class', 'enter');

// enter and update
letter.text(function(d) { return d.name; })

// remove
letter.exit().remove();
