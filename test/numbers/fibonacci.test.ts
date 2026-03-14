test("Generate fibonacci series", () => {
  function fibonacci(n: number): number[] {
    const series: number[] = [0, 1];

    for (let i = 2; i < n; i++) {
      series[i] = series[i - 1] + series[i - 2];
    }

    return series.slice(0, n); // only first n numbers
  }

  console.log(`Fibonacci series (first 10 numbers):`, fibonacci(10));
});

test("generate fibonacci series2", () => {
  let series: number[] = [];
  for (let i = 0; i < 10; i++) {
    series[i] = i === 0 ? 0 : i === 1 ? 1 : series[i - 1] + series[i - 2];
  }
  console.log(series);
});

test("generate fibonacci series with filter", () => {
  let series: number[] = [];

  for(let i=0; i<=10; i++){
      series[i] = i===0 ? 0 : i===1 ? 1 : series[i-1] + series[i-2];
  }
  const filtered = series.filter((num) => num>=3 && num<=34);
  console.log(filtered);
});