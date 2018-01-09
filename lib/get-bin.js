function getBin(text) {
  return Array.from(text)
    .map(c => c.charCodeAt(0).toString(2))
    .map(s => "0".repeat(8 - s.length) + s)
    .join("")
    .split("");
}
