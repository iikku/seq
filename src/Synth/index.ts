import { observable, computed } from "mobx"

class Synth {
  @observable device: any; // WebMidi device
  @computed get canPlayNote() {
    return this.device !== undefined;
  };
  playNote = (note: string[], channel: number, args: object) =>
    this.canPlayNote ?
    (() => {
      // console.log("playing", note, "at", channel, "with", args);
      if (note) this.device.playNote(note, channel, args);
    })() :
    () => console.log('Waiting for device initialization');
}

export default Synth;
