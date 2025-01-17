import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public width: number = 600;

    @observable
    public height: number = 500;

    @observable
    public border: string = "4px";

    @observable
    public outline: string = "transparent";

    @observable 
    public selected: boolean = false;

    @observable 
    public placed: boolean = false;

    @observable
    public opacity: number = .5;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}