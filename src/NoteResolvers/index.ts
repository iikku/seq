import Chord from '../MusicTheory/Chord';

// 1/256th note to exact note timings or null if not exact
// TODO: Add an empty optional monad instead of null
const _256thToExactOrNull = (d: number, divisor: number) => Math.floor(d / divisor) === d / divisor ? d / divisor : null

const toBeat = (n: number) => ({
  half:_256thToExactOrNull(n, 128),
  quarter:_256thToExactOrNull(n, 64),
  _8th:_256thToExactOrNull(n, 32),
  _16th:_256thToExactOrNull(n, 16),
  _32th:_256thToExactOrNull(n, 8),
});

// quarter notes to 1/256th notes
const beatToMicroBeat = (beat: number) => beat * 64;

export type BeatBasedNoteResolver =
  (microBeat: number, chord: Chord, targetOctave: number) =>
  { notes: string[], microBeats: number } | null;

export type MeasureBasedNoteResolver =
  (measure: number) => BeatBasedNoteResolver;

export type SectionBasedNoteResolver =
  (section: number) => MeasureBasedNoteResolver;

const fastArp = (demisemihemidemisemiquaver: number, chord: Chord, targetOctave: number) => {
  const beat = toBeat(demisemihemidemisemiquaver)._32th;
  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: 8
    };
  } else {
    return null;
  }
}

const notePerBeat = (demisemihemidemisemiquaver: number, chord: Chord, targetOctave: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;
  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: beatToMicroBeat(1)
    };
  } else {
    return null;
  }
}

const noteEveryTwoBeats = (demisemihemidemisemiquaver: number, chord: Chord, targetOctave: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).half;

  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: beatToMicroBeat(2)
    };
  } else {
    return null;
  }
}

const slowChord = (demisemihemidemisemiquaver: number, chord: Chord, targetOctave: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;

  if (beat === 1) {
    return {
      notes: chord.notes.map(note => note + targetOctave),
      microBeats: beatToMicroBeat(3)
    };
  } else {
    return null;
  }
}

const randomMeasureBasedNoteResolver = (measure: number) => {
    switch (Math.floor(Math.random() * 4)) {
      case 0: return notePerBeat;
      case 1: return fastArp;
      case 2: return slowChord;
      case 3: return noteEveryTwoBeats;
    }
    return noteEveryTwoBeats;
  };

const fixedMeasureBasedNoteResolver =
  (resolver: BeatBasedNoteResolver) =>
    (measure: number) => resolver;

const defaultSectionBasedNoteResolver =
  (section: number) => randomMeasureBasedNoteResolver;

const fixedSectionBasedNoteResolver =
  (resolver: MeasureBasedNoteResolver) =>
    (section: number) => resolver;

export {
  notePerBeat,
  fastArp,
  slowChord,
  noteEveryTwoBeats,

  fixedMeasureBasedNoteResolver,
  randomMeasureBasedNoteResolver,
  fixedSectionBasedNoteResolver,
  defaultSectionBasedNoteResolver
};
