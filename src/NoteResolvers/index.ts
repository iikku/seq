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

interface NoteRequest {
  microBeat: number,
  chord: Chord,
  targetOctave: number
};

export type BeatBasedNoteResolver =
  (noteRequest: NoteRequest) =>
  { notes: string[], microBeats: number } | null;

export type MeasureBasedNoteResolver =
  (measure: number) => BeatBasedNoteResolver;

export type SectionBasedNoteResolver =
  (section: number) => MeasureBasedNoteResolver;

class NoteData {
  constructor(
    note: number | null,
    startAt: number,
    duration: number
  ) {
    this.note = note;
    this.startAt = startAt;
    this.duration = duration;
  }
  note: number | null;
  startAt: number;
  duration: number;
};

const fromMotif = function() {
  const motif : NoteData[] = [];
  let shouldAddUpTo256 = 0;
  while (shouldAddUpTo256 < 256) {
    const shouldPlayNote = Math.random() > 0.2;
    // TODO incorporate octaves and notes outside the triad
    const note = shouldPlayNote ? Math.floor(Math.random() * 3) : null;
    const length = Math.floor(Math.random() * 8) * 32;
    motif.push(new NoteData(note, length, shouldAddUpTo256));

    shouldAddUpTo256 += length;
  }

  return (noteRequest : NoteRequest) => {
    const noteData = motif
      .find(noteData => noteData.startAt === noteRequest.microBeat);

    if (noteData === undefined) return null;
    if (noteData.note === null) return null;
    return {
      notes: [noteRequest.chord.notes[noteData.note] + noteRequest.targetOctave],
      microBeats: noteData.duration
    };
  }
};

const randomMeasureBasedMotif = function() {
  const motif1 = fromMotif();
  const motif2 = fromMotif();
  const motif3 = fromMotif();
  return (measure: number) => {
    switch (measure) {
      case 0: return motif1;
      case 1: return motif2;
      case 2: return motif1;
      case 3: return motif3;
    }
    return noteEveryTwoBeats;
  };
}();

const fastArp = ({microBeat, chord, targetOctave} : NoteRequest) => {
  const beat = toBeat(microBeat)._32th;
  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: 8
    };
  } else {
    return null;
  }
}

const notePerBeat = ({microBeat, chord, targetOctave} : NoteRequest) => {
  const beat = toBeat(microBeat).quarter;
  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: beatToMicroBeat(1)
    };
  } else {
    return null;
  }
}

const noteEveryTwoBeats = ({microBeat, chord, targetOctave} : NoteRequest) => {
  const beat = toBeat(microBeat).half;

  if (beat !== null) {
    return {
      notes: [chord.notes[beat % chord.notes.length] + targetOctave],
      microBeats: beatToMicroBeat(2)
    };
  } else {
    return null;
  }
}

const slowChord = ({microBeat, chord, targetOctave} : NoteRequest) => {
  const beat = toBeat(microBeat).quarter;

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
  randomMeasureBasedMotif,
  notePerBeat,
  fastArp,
  slowChord,
  noteEveryTwoBeats,

  fixedMeasureBasedNoteResolver,
  randomMeasureBasedNoteResolver,
  fixedSectionBasedNoteResolver,
  defaultSectionBasedNoteResolver
};
