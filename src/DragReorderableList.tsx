import React from 'react';
import styled from 'styled-components';
import { DragReorderableListItem } from './DragReorderableListItem';
import { CHILD_HEIGHT } from './constants';
import uuid from 'uuid';

const ListWrapper = styled.div`
    user-select: none;
`;

// TODO: variable left
const DragWrapper = styled.div`
    position: absolute;
    z-index: 3;
    left: 0;
    box-shadow: 3px 3px 5px 6px #ccc;
    border: 1px solid blue;
    width: 100%;
    background: white;
`;

const PlaceholderDiv = styled.div`
    height: ${CHILD_HEIGHT}px;
`;

const ButtonContainer = styled.div`
    padding: 10px;
`;

const AddButton = styled.button`
    background: #28a745;
    color: white;
    border: none;
    height: 30px;
    width: 100px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
`;

const COLORS = [
    "#DB3737",
    "#137CBD",
    "#D9822B",
    "#29A634",
    "#8F398F",
    "#D99E0B",
]

interface TestData {
    title: string;
    color: string;
}

interface State {
    draggingItem: DragData | undefined;
    childElements: { [id: string]: TestData };
    childElementOrder: Array<string>;
    mouseY: number;
}

interface DragData {
    id: string;
    mouseOffset: number;
}

function swap(arr: Array<string>, idx1: number, idx2: number): Array<string> {
    return arr.map((id, idx) => {
        if (idx === idx1) {
            return arr[idx2];
        } else if (idx === idx2) {
            return arr[idx1];
        }
        return id;
    })
}

function getNextColor(listSize: number) {
    const idx = listSize % COLORS.length;
    return COLORS[idx];
}

export class DragReorderableList extends React.PureComponent<{}, State> {
    public state: State = {
        draggingItem: undefined,
        childElements: {
            t1: { title: "Test 1", color: getNextColor(0) },
            t2: { title: "Test 2", color: getNextColor(1) },
            t3: { title: "Test 3", color: getNextColor(2) },
        },
        childElementOrder: [ "t1", "t2", "t3" ],
        mouseY: 0,
    }

    public componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    public componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    public render() {
        const { draggingItem } = this.state;

        return (
            <ListWrapper>
                {this.state.childElementOrder.map((id, idx) => {
                    const item = this.state.childElements[id];
                    if (draggingItem && draggingItem.id === id) {
                        return (
                            <PlaceholderDiv key="placeholder" />
                        )
                    }
                    return (
                        <DragReorderableListItem
                            key={id}
                            id={id}
                            title={item.title}
                            color={item.color}
                            displayIndex={idx + 1}
                            onDrag={this.handleDragStart}
                        />
                    );
                })}
                {this.maybeRenderDraggingItem()}
                <ButtonContainer>
                    <AddButton onClick={this.addItem}>+ Add Item</AddButton>
                </ButtonContainer>
            </ListWrapper>
        )
    }

    private maybeRenderDraggingItem = () => {
        if (this.state.draggingItem && this.state.childElements[this.state.draggingItem.id]) {
            const item = this.state.childElements[this.state.draggingItem.id];
            return (
                <DragWrapper style={{ top: this.state.mouseY - this.state.draggingItem.mouseOffset }}>
                    <DragReorderableListItem
                        id={this.state.draggingItem.id}
                        title={item.title}
                        color={item.color}
                        onDrag={this.handleDragStart}
                    />
                </DragWrapper>
            );
        }
    }

    private handleDragStart = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        const childElement = this.state.childElements[id];
        const index = this.state.childElementOrder.findIndex((itemId) => itemId === id);
        if (childElement && index !== undefined) {
            const itemTop = index * CHILD_HEIGHT;
            this.setState({
                draggingItem: {
                    id,
                    mouseOffset: e.clientY - itemTop,
                },
                mouseY: e.clientY,
            });

            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    private getTopY(clientY: number, mouseOffset: number) {
        return clientY - mouseOffset;
    }

    private getCenterY(top: number, height: number) {
        return top + (height / 2);
    }

    private handleMouseMove = (e: any) => {
        const { draggingItem } = this.state;
        if (draggingItem) {
            const index = this.state.childElementOrder.findIndex((itemId) => itemId === draggingItem.id);
            const topY = this.getTopY(e.clientY, draggingItem.mouseOffset);
            const aboveItemCenter = this.getCenterY((index - 1) * CHILD_HEIGHT, CHILD_HEIGHT);
            const itemCenter = this.getCenterY((index) * CHILD_HEIGHT, CHILD_HEIGHT);
            
            if (index > 0 && topY < aboveItemCenter) {
                this.setState({ childElementOrder: swap(this.state.childElementOrder, index - 1, index) });
            } else if (index < this.state.childElementOrder.length - 1 && topY > itemCenter) {
                this.setState({ childElementOrder: swap(this.state.childElementOrder, index, index + 1) });
            }
            this.setState({ mouseY: e.clientY });
        }
    }

    private handleMouseUp = () => {
        if (this.state.draggingItem) {
            // Clean up
            this.setState({ draggingItem: undefined });
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
    }

    private addItem = () => {
        const id = uuid.v4();
        this.setState({
            childElementOrder: [ ...this.state.childElementOrder, id ],
            childElements: {
                ...this.state.childElements,
                [id]: { title: 'Untitled item', color: getNextColor(this.state.childElementOrder.length) },
            },
        });
    }

    // private childResized = (id: string, height: number) => {
    //     const childElementIdx = this.state.childElements.findIndex((item) => item.id === id);
    //     if (childElementIdx) {
    //         const updatedChildElements = [ ...this.state.childElements ];
    //         updatedChildElements[childElementIdx] = {
    //             ...updatedChildElements[childElementIdx],
    //             height,
    //         };
    //         this.setState({ childElements: updatedChildElements });
    //     }
    // }
}
