import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import { reaction, autorun } from "mobx"
import { now } from "mobx-utils"
import PlayPauseButton from '../PlayPauseButton';
import TrackListing from '../TrackListing';
import Synth from '../Synth';
import Song from '../Song';

const synth = new Synth();
const catchyTune = new Song();

// Initialize the frameAdvancer that's advanced (currently) once per beatLengthInMs
autorun(() => {
  catchyTune.frameAdvancer = now(catchyTune.beatLengthInMs);

  // If the frameAdvancer granularity is changed, the beat counter calculation must be adapted.
  catchyTune.currentBeat = (catchyTune.currentBeat + 1) % catchyTune.beatsPerMeasure;
  if (catchyTune.currentBeat === 0) {
    catchyTune.currentMeasure = (catchyTune.currentMeasure + 1) % catchyTune.progression.length;
  }
});

// Tie the song, the synth and the frameAdvancer timing loop together with
// the mobx's reaction().
reaction(
    () => catchyTune.frameAdvancer,
    frameAdvancer => {
      // Whenever the frame advancer notifies us, calculate new next notes
      // for all the tracks. If the arpeggiator gives us new note data, play it.
      // If the arpeggiator returns null as the nextNotes, this signifies that no
      // new note data should be sent to the synth.
      catchyTune.tracks.forEach(track => {
        const currentChord = catchyTune.progression[catchyTune.currentMeasure];
        const nextNotes = track.notesFromChord(
          currentChord,
          catchyTune.currentBeat);
        if (nextNotes) {
          synth.playNote(
            nextNotes.notes,
            track.channel,
            {duration: catchyTune.beatLengthInMs * nextNotes.beats}
          );
        }
      });
    }
);

const midiDeviceMounter = {
  componentDidMount(props) {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }

      // TODO: Add option to change the output on the UI
      synth.device = WebMidi.outputs[1];
      console.log("Device set to", synth.device);
    });
  }
};

const NotePlayer = ({ song }) => (
    <div>
      <button onClick={() => (song.nextNote = "C3")}>
        C3
      </button>
      <button onClick={() => (song.nextNote = "E3")}>
        E3
      </button>
    </div>
);

const Player = () => (
    <div>
      <TrackListing tracks={catchyTune.tracks} />
      <PlayPauseButton synth={synth} />
      <NotePlayer song={catchyTune} />
    </div>
);

export default lifecycle(midiDeviceMounter)(Player);
