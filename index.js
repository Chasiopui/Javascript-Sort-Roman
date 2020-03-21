const fileInput = document.getElementById('file-input');
const downloadLink = document.getElementById('download-link');
const inputP = document.getElementById('input-p');
const outputP = document.getElementById('output-p');

function romanToNum(roman) {
  if (roman === "")           return 0;
  if (roman.startsWith("L"))  return 50 + romanToNum(roman.substr(1));
  if (roman.startsWith("XL")) return 40 + romanToNum(roman.substr(2));
  if (roman.startsWith("X"))  return 10 + romanToNum(roman.substr(1));
  if (roman.startsWith("IX")) return 9  + romanToNum(roman.substr(2));
  if (roman.startsWith("V"))  return 5  + romanToNum(roman.substr(1));
  if (roman.startsWith("IV")) return 4  + romanToNum(roman.substr(2));
  if (roman.startsWith("I"))  return 1  + romanToNum(roman.substr(1));
  return 0;
}

function getSortedList(inputs) {
  return inputs
    // .map(n => [n, romanToNum(n.split(' ').pop())])
    // .sort((a, b) => a[1] - b[1])
    // .map(n => n[0]);
    .map(n => {
      const splitted = n.split(' ');
      const roman = splitted.pop();
      const name = splitted.join(' ');

      return [n, name, romanToNum(roman)];
    })
    .sort((a, b) => {
      const compare = a[1].localeCompare(b[1]);

      if (compare === 0) return a[2] - b[2];
      return compare;
    })
    .map(n => n[0]);
}

fileInput.addEventListener('change', (ev) => {
  const file = ev.target.files[0];

  if (!file) return;

  const fr = new FileReader();
  
  fr.onload = (e) => {
    const result = e.target.result.trim();
    const inputs = result.split('\n');
    const outputs = getSortedList(inputs);

    inputP.innerHTML = `Input:<br />${inputs.join('<br />')}`
    outputP.innerHTML = `Output:<br />${outputs.join('<br />')}`;

    const blob = new Blob([outputs.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    downloadLink.href = url
    downloadLink.download = 'output.txt';
  }

  fr.readAsText(file)
});