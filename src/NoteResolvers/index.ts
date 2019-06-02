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

const fastArp = (chord: string[], demisemihemidemisemiquaver: number) => {
  const beat = toBeat(demisemihemidemisemiquaver)._32th;
  if (beat !== null) {
    return {
      notes: [chord[beat % chord.length]],
      microBeats: 8
    };
  } else {
    return null;
  }
}

const notePerBeat = (chord: string[], demisemihemidemisemiquaver: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;
  if (beat !== null) {
    return {
      notes: [chord[beat % chord.length]],
      microBeats: beatToMicroBeat(1)
    };
  } else {
    return null;
  }
}

const noteEveryTwoBeats = (chord: string[], demisemihemidemisemiquaver: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).half;

  if (beat !== null) {
    return {
      notes: [chord[beat % chord.length]],
      microBeats: beatToMicroBeat(2)
    };
  } else {
    return null;
  }
}

const slowChord = (chord: string[], demisemihemidemisemiquaver: number) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;

  if (beat === 1) {
    return {
      notes: chord,
      microBeats: beatToMicroBeat(3)
    };
  } else {
    return null;
  }
}

export {
  notePerBeat,
  fastArp,
  slowChord,
  noteEveryTwoBeats
};
