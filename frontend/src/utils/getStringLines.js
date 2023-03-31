export default function getStringLines(str, isMobile) {
  const charInLine = isMobile ? 30 : 150;
  const lines = str.split(/\r?\n/);
  let lineCount = 0;
  lines.forEach((line) => {
    lineCount += Math.max(Math.ceil(line.length / charInLine), 1);
  });
  return lineCount;
}
