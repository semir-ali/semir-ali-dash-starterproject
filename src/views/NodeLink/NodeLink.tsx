import { observer } from "mobx-react";
import * as React from 'react';
import { ArcherElement, ArcherContainer } from "react-archer";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { VideoNodeView } from "../nodes";
import { TextNodeView } from "../nodes";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { NodeStore } from "../../stores";
import { StoreType } from "../../stores";
import { NodeCollectionStore } from "../../stores";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { StaticTextNodeStore } from "../../stores";
import { VideoNodeStore } from "../../stores";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";

interface NodeLinkProps {
    node1: NodeStore;
    node2: NodeStore;
    collection: NodeCollectionStore;
}


// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class NodeLink extends React.Component<NodeLinkProps> {

    render() {
        const node1 = this.props.node1;
        const node2 = this.props.node2;
        const collection = this.props.collection;
        console.log(node1);
        console.log(node2);
            return (
                <ArcherContainer style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
                    <ArcherElement id={node1.Id}
                    relations={[
                                {targetId: node2.Id,
                                    sourceAnchor: 'left',
                                    targetAnchor: 'right'},
                                    ]}>
                        <div  style={{
                            width:100,
                            height:100
                        }}>{this.findVisualDisplayOfNode(node1, collection)}</div>
                    </ArcherElement>
                    <ArcherElement id={node2.Id}
                        relations={[
                                {targetId: node1.Id,
                                    sourceAnchor: 'right',
                                    targetAnchor: 'left'},
                                    ]}>
            <div style={{ width: 100, height: 100 }}>
                {this.findVisualDisplayOfNode(node2, collection)}
            </div>
        </ArcherElement>
                </ArcherContainer>
                );
            }
    findVisualDisplayOfNode = (store: NodeStore, collection: NodeCollectionStore) => {
        switch (store.type) {
        case StoreType.Text:
            return (<TextNodeView key={store.Id} store={store as StaticTextNodeStore} collection={collection}/>) 
        case StoreType.Video:
            return (<VideoNodeView key={store.Id} store={store as VideoNodeStore} collection={collection}/>)
        case StoreType.Image:
            return (<ImageNodeView key={store.Id} store={store as ImageNodeStore} collection={collection}/>)
        case StoreType.Website:
            return (<WebsiteNodeView key={store.Id} store={store as WebsiteNodeStore} collection={collection}/>)
        default:
            return (null);
    }
    }
    }