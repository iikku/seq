import ChordQuality from '../ChordQuality';

class Chord {
  constructor(base: string, quality: ChordQuality, notes: string[]) {
    this.base = base;
    this.quality = quality;
    this.notes = notes;
  }

  base: string;
  quality: ChordQuality;
  notes: string[];
}

export default Chord;
