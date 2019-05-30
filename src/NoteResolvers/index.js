const notePerBeat = (measure, beat) => {
  return {
    notes: measure[beat],
    beats: 1
  }
}

const noteEveryTwoBeats = (measure, beat) => {
  if (beat % 2) {
    return {
      notes: measure[beat],
      beats: 2
    }
  } else {
    return null;
  }
}

const slowChord = (measure, beat) => {
  if (beat === 1) {
    return {
      notes: [measure[0], measure[1], measure[2]],
      beats: 3
    }
  } else {
    return null;
  }
}

export {
  notePerBeat,
  slowChord,
  noteEveryTwoBeats
};
