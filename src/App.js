import React from 'react';
import Tone from 'tone';
import { majorScale, minorScale } from './components/scales';
import Piano from './components/piano';
import './App.css';

//pass in some initial values for the filter and filter envelope
const synth = new Tone.Synth({
	"oscillator" : {
		"type" : "pwm",
		"modulationFrequency" : 0.2
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.9,
	}
}).toMaster();

// var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
//play a chord

const play = () => {
  // const synthPart = new Tone.Sequence(
  //   (time, note) => {
  //     synth.triggerAttackRelease(note, "10hz", time);
  //   },
  //   minorScale("C"),
  //   "4n"
  // );

  // console.log(majorScale("C"));
  // console.log(minorScale("C", "b"));
  
  // synthPart.loop = false;
  // synthPart.start();
  
  // Tone.Transport.start();

  // synth.triggerAttackRelease("C5", "8n");

  var chord = new Tone.Event(function(time, chord){
    console.log("start");
    synth.triggerAttackRelease(chord, "4n", time);
    console.log("stop");
    //the chord as well as the exact time of the event
    //are passed in as arguments to the callback function
  }, "D4");
  //start the chord at the beginning of the transport timeline
  chord.start();
  //loop it every measure for 8 measures
  chord.loop = 1;
  chord.loopEnd = "1m";

  Tone.Transport.start();
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Piano key="piano" />
        <button onClick={() => play()} >Play major scale</button>
      </header>
    </div>
  );
}

export default App;
