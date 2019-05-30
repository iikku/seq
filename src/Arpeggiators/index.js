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

export {
  notePerBeat,
  noteEveryTwoBeats
};
