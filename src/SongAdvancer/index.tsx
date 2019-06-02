import { observable, computed, reaction, autorun } from "mobx"
import { now } from "mobx-utils"
import Song from '../Song';
import Chord from '../MusicTheory/Chord';
import Synth from '../Synth';

// Initialize the frame advancer that's advanced once per demisemihemidemisemiquaver note - 1/256th note that is.
// To change the granularity, refactor lots.
const microBeatsPerMeasure = 256;

// quarter notes to demisemihemidemisemiquaver notes.
const transformBpmToMicroBeatLengthInMs = (bpm: number) => ((60 * 1000) / bpm) / (microBeatsPerMeasure / 4);

class SongAdvancer {
  constructor(catchyTune: Song) {
    this.catchyTune = catchyTune;
  }

  catchyTune: Song;
  @observable frame: number = 0;
  @observable paused: boolean = true;
  playPause = () => this.paused = !this.paused;
  @observable currentChord: Chord | null = null;
  @computed get microBeatLengthInMs() {
    return transformBpmToMicroBeatLengthInMs(this.catchyTune.bpm);
  }
}

const playSongWithSynth = (catchyTune: Song, synth: Synth) => {
  const advancer = new SongAdvancer(catchyTune);

  // Setup the song advancer to advance at microBeatLengthInMs granularity.
  // Advance the microBeats, i.e. 1/256th notes, at every call and advance the measure when needed
  autorun(() => {
    // This will advance the song to the next step
    if (!advancer.paused) {
      advancer.frame = now(advancer.microBeatLengthInMs);

      catchyTune.currentMicroBeat = (catchyTune.currentMicroBeat + 1) % microBeatsPerMeasure;
      if (catchyTune.currentMicroBeat === 0) {
        catchyTune.currentMeasure = (catchyTune.currentMeasure + 1) % catchyTune.progression.length;
      }
    }
  });

  // Tie the song, the synth and the frame advancer timing loop together with
  // the mobx's reaction().
  reaction(
      () => advancer.frame,
      frame => {
        // Whenever the frame advancer notifies us, calculate new next notes
        // for all the tracks. If the arpeggiator gives us new note data, play it.
        // If the arpeggiator returns null as the nextNotes, this signifies that no
        // new note data should be sent to the synth.
        advancer.currentChord = catchyTune.progression[catchyTune.currentMeasure];
        if (advancer.currentChord) {
          catchyTune.tracks.forEach(track => {
            const nextNotes = track.notesFromChord(
              advancer.currentChord!,
              catchyTune.currentMicroBeat
            );

            if (nextNotes) {
              synth.playNote(
                nextNotes.notes,
                track.channel,
                {duration: advancer.microBeatLengthInMs * nextNotes.microBeats}
              );
            }
          });
      }
    }
  );


  return advancer;
};

export default SongAdvancer;
export { playSongWithSynth }
