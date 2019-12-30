import React, { useState } from 'react';
import Tone from 'tone';
import { toOctave } from '../scales';
import './Piano.css';

const ivoryKeys = ["C", "D", "E", "F", "G", "A", "B"];
const ebonyKeys = ["C#", "D#", null, "F#", "G#", "A#", null];
const ivoryKeys2octaves = toOctave(ivoryKeys, "4").concat(toOctave(ivoryKeys, "5"));
const ebonyKeys2octaves = toOctave(ebonyKeys, "4").concat(toOctave(ebonyKeys, "5"));

const synth = new Tone.Synth({
	"oscillator" : {
		"type" : "triangle",
		"modulationFrequency" : 0.2
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.9,
	}
}).toMaster();

const playNote = (note) => synth.triggerAttackRelease(note, "8n");

const IvoryKey = ({ note }) => {
  const [selected, setSelected] = useState(false);

  const sizePerc = 100.0 / ivoryKeys2octaves.length;
  const positionPerc = ivoryKeys2octaves.indexOf(note) * sizePerc;

  const style = {
    left: `${positionPerc}%`
  }

  const onClick = () => playNote(note);

  const className = "piano-key ivory-key " + (selected ? "key-selected" : "");

  return (
      <div className={className} style={style} onClick={onClick} />
  );
};

const EbonyKey = ({ note }) => {
  const sizePerc = 100.0 / ebonyKeys2octaves.length;
  const positionPerc = (ebonyKeys2octaves.indexOf(note) * sizePerc) + 3 * sizePerc / 5;

  const style = {
    left: `${positionPerc}%`
  }

  const onClick = () => playNote(note);

  return (
      <div className="piano-key ebony-key" style={style} onClick={onClick} />
  );
};

const Piano = () => {
  return (
    <div className="piano-container">
      {ivoryKeys2octaves.map(key => <IvoryKey key={key} note={key} />)}
      {ebonyKeys2octaves.filter(key => key !== null).map(key => <EbonyKey key={key} note={key} />)}
    </div>
  );
};

export default Piano;