import { observer } from "mobx-react";
import * as React from 'react';
import { StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: StaticTextNodeStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node textNode" style={{ transform: store.transform, width: store.width, border: store.border, outline: store.outline, height: store.height}} 
            onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            onClick={this.onClickEvent}
            onPointerDown={this.onPointerDown}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <p className="paragraph">{store.text}</p>
                    </div>
                </div>
            </div>
        );
    }

    onClickEvent = (e: React.MouseEvent) => {
        this.changeColor();
    }

    changeColor() {
        console.log(this.props.store.selected);
        if (!this.props.store.selected) {
            this.props.store.outline = "10px blue solid"
        }
        else {
            this.props.store.outline = "transparent"
        }
        this.props.store.selected = !this.props.store.selected;
    }

    onPointerDown = (e: React.PointerEvent) => {
        if (this.props.store.selected) {
            document.addEventListener("pointermove", this.onPointerMove)
        }
        else {
            document.removeEventListener("pointermove", this.onPointerMove)
        }
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.store.selected) return;
        this.props.store.width += e.movementX;
        this.props.store.height += e.movementY;
    }
}