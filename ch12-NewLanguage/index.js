
// Sample Program
do (define(x, 10),
  if (> (x, 5),
  print("large"),
  print("small")))

// Would compile to
{
  type: "apply",
    operator: { type: "word", name: ">"; },
  args: [
    { type: "word", name: "x" },
    { type: "value", value: 5 }
  ];
}
