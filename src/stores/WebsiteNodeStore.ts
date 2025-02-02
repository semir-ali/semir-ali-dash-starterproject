import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// Stores all the relevant information about the website nodes
export class WebsiteNodeStore extends NodeStore {

    constructor(initializer: Partial<WebsiteNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public url: string | undefined;

}