import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This component essentially stores all relevant information to model an image node
 */
export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        /**
         An object of type Partial<StaticTextNodeStore> means that the object passed into it will have the properties of a StaticTextNodeStore (title and text, below), as well as the properties of a NodeStore, which it inherits from. 
         Additionally, the Partial<> bit makes all these properties optional, so the object passed in may not have all these properties.
         */ 
        super();
        Object.assign(this, initializer);

        /*
        the line above is equivalent to:

        this.x = initializer.x;
        this.y = initializer.y;
        this.title = initializer.title;
        this.text = initializer.text;
        */
    }

    // Unique url for the image
    @observable
    public url: string = "";
}