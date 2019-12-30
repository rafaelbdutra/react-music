// const
const notesWithSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notesWithFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// functions
const toOctave = (notes, octave) => {
  return notes.map(n => {
    if (n === null) return null;
    return n + octave;
  });
};

const transposeScale = (root, scaleDegrees, accident = "#") => {
  if (accident !== "#" && accident !== "b")
    throw new Error("Accident must be either # or b");

  const notesWithAccidents = accident === "#" ? notesWithSharps : notesWithFlats;
  const notesWithAccidents2octaves = toOctave(notesWithAccidents, "4").concat(toOctave(notesWithAccidents, "5"));

  const initialPos = Math.max(notesWithSharps.indexOf(root), notesWithFlats.indexOf(root));
  var pos = initialPos;

  if (initialPos === -1)
    throw new Error("Invalid root key");

  var scale = scaleDegrees.map((v) => {
    if (v === Steps.W) pos += 2;
    else pos++;
    return notesWithAccidents2octaves[pos];
  });
  scale.unshift(notesWithAccidents2octaves[initialPos]);

  return scale;
};

// scale degrees
const Steps = {
  W: 2,
  H: 1
};

// scales
const majorScaleDegrees = [Steps.W, Steps.W, Steps.H, Steps.W, Steps.W, Steps.W, Steps.H];
const minorScaleDegrees = [Steps.W, Steps.H, Steps.W, Steps.W, Steps.H, Steps.W, Steps.W];

export { toOctave };
export const majorScale = (root, accident = "#") => transposeScale(root, majorScaleDegrees, accident);
export const minorScale = (root, accident = "#") => transposeScale(root, minorScaleDegrees, accident);