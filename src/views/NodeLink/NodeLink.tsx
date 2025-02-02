import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore, ResizableNodesVisibility } from "../../stores";
import { NodeCollectionStore } from "../../stores";
import { NodePosition } from "../../stores";
import { Constants } from "../../Constants";

interface NodeLinkProps {
    node1: NodeStore;
    node2: NodeStore;
    nodeCollection: NodeCollectionStore;
}


// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class NodeLink extends React.Component<NodeLinkProps> {

render() {
    const nodeCollection = this.props.nodeCollection;
    const node1 = this.props.node1;
    const node2 = this.props.node2;
    const initialX = node1.x + (node1.width/2);
    const initialY = node1.y + (node1.height/2);
    const finalX = node2.x + (node1.width/2);
    const finalY = node2.y + (node2.height/2);
    const distance = this.findProperty(initialX, initialY, finalX, finalY, "Distance");
    const angle = this.findProperty(initialX, initialY, finalX, finalY, "Angle of rotation");
    // Checks if both nodes are linked (only possible if they have been linked and have not been deleted)
    if (node1.linkedNode && node2.linkedNode)
    {
        return (
            <div
                className="nodelink"
                style={{
                    position: Constants.LINK_POSITION,
                    top: initialY,
                    left: initialX,
                    width: distance, // Width is the distance between the nodes
                    height: Constants.LINK_LENGTH,
                    backgroundColor: Constants.LINK_COLOR,
                    transform: `rotate(${angle}rad)`, // Allows the link to rotate
                    transformOrigin: "0 50%", // Rotate around the starting point
                    }}
                    onClick={e => this.centerLinkedNode(e, nodeCollection, node1, node2)}
            ></div>
        );
    }
    }

    // Uses the properties of the change in x and y to return relevant values (i.e. distance from two points and angle between two points)
    findProperty = (initialX: number, initialY: number, finalX: number, finalY: number, formula: string) => {
        const dx = finalX - initialX; // Change in x
        const dy = finalY - initialY; // Change in y
        if (formula === "Distance") {
            return Math.sqrt((dx * dx) + (dy * dy));
        }
        else if (formula === "Angle of rotation") {
            return Math.atan2(dy, dx);
        }
    }

    // When one linked node is selected and the node link is selected, moves the screen so the other node is the center of the screen
    centerLinkedNode = (e: React.MouseEvent, nodeCollection: NodeCollectionStore, node1: NodeStore, node2: NodeStore) => {
        if (node1.position === NodePosition.Selected && node2.position === NodePosition.Selected) return;
        node1.centerX = node1.x + (node1.width/2)
        node1.centerY = node1.y + (node1.height/2)
        node2.centerX = node2.x + (node2.width/2)
        node2.centerY = node2.y + (node2.height/2)
        var xDistanceFromMouse = 0;
        var yDistanceFromMouse = 0;
        if (node1.position === NodePosition.Selected) {
            xDistanceFromMouse = -(node2.centerX - e.pageX + nodeCollection.xOffset);
            yDistanceFromMouse = -(node2.centerY - e.pageY + nodeCollection.yOffset);
            node1.position = NodePosition.Unselected;
            node1.resizableNodeVisibility = ResizableNodesVisibility.Hidden;
        }
        else {
            xDistanceFromMouse = -(node1.centerX - e.pageX + nodeCollection.xOffset);
            yDistanceFromMouse = -(node1.centerY - e.pageY + nodeCollection.yOffset);
            node2.position = NodePosition.Unselected;
            node2.resizableNodeVisibility = ResizableNodesVisibility.Hidden;
        }
        nodeCollection.x += xDistanceFromMouse;
        nodeCollection.xOffset += xDistanceFromMouse;

        nodeCollection.y += yDistanceFromMouse;
        nodeCollection.yOffset += yDistanceFromMouse;

        nodeCollection.unselectAllNodes();
    }
}