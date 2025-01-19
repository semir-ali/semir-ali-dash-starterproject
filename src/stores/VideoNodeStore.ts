import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// Stores all the information for a video node
export class VideoNodeStore extends NodeStore {

    constructor(initializer: Partial<VideoNodeStore>) {
        super();
        Object.assign(this, initializer);
    }
    // Unique parts of the 
    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

}