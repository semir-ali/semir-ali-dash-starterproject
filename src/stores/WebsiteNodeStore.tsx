import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class WebsiteNodeStore extends NodeStore {

    constructor(initializer: Partial<WebsiteNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

}