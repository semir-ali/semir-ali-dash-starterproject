import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// Stores relevant information about the text node
export class StaticTextNodeStore extends NodeStore {

    constructor(initializer: Partial<StaticTextNodeStore>) {
        super();
        Object.assign(this, initializer);
    }
    
    @observable
    public text: string = "";
}