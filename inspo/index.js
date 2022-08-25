"use strict";
let cx7 = document.querySelector("#pie").getContext("2d");

function drawPieChart(results) {
  let total = results.reduce(
    (sum, { count }) => sum + count, 0);
  let currentAngle = 0.5 * Math.PI;

  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx7.beginPath();
    //center = 100,100
    //from current angle, clockwise by slice's angle
    cx7.arc(100, 100, 100,
      currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx7.lineTo(100, 100);
    cx7.fillStyle = result.color;
    cx7.fill();
  }
}

let input = document.querySelector("#text-input");
input.addEventListener("input", updateValues)
// let timeout;
// input.addEventListener("input", () => {
//   clearTimeout(timeout);
//   timeout = setTimeout(updateValues, 500);
// });

function updateValues(event) {
  const chars = event.target.value;

  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const numbers = "123456789";

  const results = [
    { name: "consonants", count: 0, color: "#e67e22" },
    { name: "vowels", count: 0, color: "#3498db" },
    { name: "numbers", count: 0, color: "#2ecc71" },
    { name: "symbols", count: 0, color: "#9b59b6" },
  ];

  for (let char of chars.toLowerCase()) {
    if (vowels.includes(char)) {
      results[1].count++;
    } else if (numbers.includes(char)) {
      results[2].count++;
    } else if (consonants.includes(char)) {
      results[0].count++;
    } else {
      results[3].count++;
    }
  }
  console.table(results)
  drawPieChart(results)
}

// navigator.clipboard.readText()
//   .then(text => {
//     console.log('Pasted content: ', text);
//   })
//   .catch(err => {
//     console.error('Failed to read clipboard contents: ', err);
//   });