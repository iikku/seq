import { observable, computed } from "mobx"

class Synth {
  @observable device = null;
  @observable paused = false;
  @computed get canPlayNote() {
    return this.device !== null && !this.paused;
  };
  playPause = () => this.paused = !this.paused;
  playNote = (note, channel, args) =>
    this.canPlayNote ?
    (() => {
      console.log("playing", note, "at", channel, "with", args);
      if (note) this.device.playNote(note, channel, args);
    })() :
    () => console.log('Waiting for device initialization');
}

export default Synth;
