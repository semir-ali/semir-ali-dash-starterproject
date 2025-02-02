import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// Stores relevant information about the text node
export class AudioNodeStore extends NodeStore {

    constructor(initializer: Partial<AudioNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    // Represents the unique part of the text node
    @observable
    public mp3: string = "";
}