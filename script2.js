var padding = { top: 20, right: 40, bottom: 20, left: 40 },
  w = 700 - padding.left - padding.right,
  h = 700 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  // oldpick = [],
  color = d3.scale.category20(); 
var data = [
  {
    label: "सर्गः  1",
    value: 1,
    question: "सर्गः 1 श्लोकः " + Math.floor(Math.random() * 55 + 1),
  }, 
  {
    label: "सर्गः  2",
    value: 2,
    question: "सर्गः 2 श्लोकः " + Math.floor(Math.random() * 54 + 1),
  }, 
  {
    label: "सर्गः  3",
    value: 3,
    question: "सर्गः 3 श्लोकः " + Math.floor(Math.random() * 56 + 1),
  },
  {
    label: "सर्गः  4",
    value: 4,
    question: "सर्गः 4 श्लोकः " + Math.floor(Math.random() * 54 + 1),
  }, 
  {
    label: "सर्गः  5",
    value: 5,
    question: "सर्गः 5 श्लोकः " + Math.floor(Math.random() * 52 + 1),
  }, 
  {
    label: "सर्गः  6",
    value: 6,
    question: "सर्गः 6 श्लोकः " + Math.floor(Math.random() * 57 + 1),
  }, 
  {
    label: "सर्गः  7",
    value: 7,
    question: "सर्गः 7 श्लोकः " + Math.floor(Math.random() * 59 + 1),
  }, 
  {
    label: "सर्गः  8",
    value: 8,
    question: "सर्गः 8 श्लोकः " + Math.floor(Math.random() * 54 + 1),
  }, 
  {
    label: "सर्गः  9",
    value: 9,
    question: "सर्गः 9 श्लोकः " + Math.floor(Math.random() * 55 + 1),
  }, 
  {
    label: "सर्गः  10",
    value: 10,
    question: "सर्गः 10 श्लोकः " + Math.floor(Math.random() * 56 + 1),
  },
  {
    label: "सर्गः  11",
    value: 11,
    question: "सर्गः 11 श्लोकः " + Math.floor(Math.random() * 79 + 1),
  },
  {
    label: "सर्गः  12",
    value: 12,
    question: "सर्गः 12 श्लोकः " + Math.floor(Math.random() * 54 + 1),
  },
  {
    label: "सर्गः  13",
    value: 13,
    question: "सर्गः 13 श्लोकः " + Math.floor(Math.random() * 69 + 1),
  },
  {
    label: "सर्गः  14",
    value: 14,
    question: "सर्गः 14 श्लोकः " + Math.floor(Math.random() * 55 + 1),
  },
  {
    label: "सर्गः  15",
    value: 15,
    question: "सर्गः 15 श्लोकः " + Math.floor(Math.random() * 141 + 1),
  },
  {
    label: "सर्गः  16",
    value: 16,
    question: "सर्गः 16 श्लोकः " + Math.floor(Math.random() * 58 + 1),
  },
];
var svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom)
  .style("display", "block")
  .style({"font-size": "25px"})
  .style("margin", "0 auto");

var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  )
  .style("font-size", "25px");
var vis = container.append("g");
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" })
  .on("mouseover", function () {
    d3.select(this).style("fill", "#ddd");
  })
  .on("mouseout", function () {
    d3.select(this).style("fill", "white");
  });

container
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("सुमध्वविजयः")
  .style({ "font-weight": "bold", "font-size": "20px" });

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
var arc = d3.svg.arc().outerRadius(r);
var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  })
  .style("cursor", "pointer")
  .on("mouseover", function () {
    d3.select(this).style("opacity", 0.8);
  })
  .on("mouseout", function () {
    d3.select(this).style("opacity", 1);
  });
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 10) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });

container.on("click", spin);
function spin(d) {
  container.on("click", null);
  // console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  // if (oldpick.length == data.length) {
  //   console.log("done");
  //   container.on("click", null);
  //   return;
  // }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 144099 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  // picked = Math.floor(Math.random() * 15);
  picked = picked >= data.length ? picked % data.length : picked;
  // if (oldpick.indexOf(picked) !== -1) {
  //   d3.select(this).call(spin);
  //   return;
  // } else {
  //   oldpick.push(picked);
  // }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      // d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
      //   "fill",
      //   "#111"
      // );
      //populate question
      d3.select("#question h1").text(data[picked].question);
      oldrotation = rotation;

      console.log(data[picked].value);

      container.on("click", spin);
    });
}
svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (w + padding.left + padding.right) +
      "," +
      (h / 2 + padding.top) +
      ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
  .style({ fill: "black" });
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" });
container
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("सुमध्वविजयः")
  .style({ "font-weight": "bold", "font-size": "20px" });

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}
