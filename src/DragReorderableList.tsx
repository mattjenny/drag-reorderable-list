import React from 'react';
import styled from 'styled-components';
import { Button } from '@blueprintjs/core';
import { DragReorderableListItem } from './DragReorderableListItem';
import { CHILD_HEIGHT } from './constants';
import { TestData } from './types';
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

const COLORS = [
    "#DB3737",
    "#137CBD",
    "#D9822B",
    "#29A634",
    "#8F398F",
    "#D99E0B",
]

interface Props {
    data: Array<TestData>,
    swapItems: (idx1: number, idx2: number) => void;
    addItem:() => void;
    removeItem:(id: string) => void;
    setTitle:(id: string, title: string) => void;
}

interface State {
    draggingItem: DragData | undefined;
    mouseY: number;
}

interface DragData {
    id: string;
    mouseOffset: number;
}

export class DragReorderableList extends React.PureComponent<Props, State> {
    public state: State = {
        draggingItem: undefined,
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
                {this.props.data.map((item, idx) => {
                    if (draggingItem && draggingItem.id === item.id) {
                        return (
                            <PlaceholderDiv key="placeholder" />
                        )
                    }
                    return (
                        <DragReorderableListItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            color={item.color}
                            displayIndex={idx + 1}
                            onDrag={this.handleDragStart}
                            removeItem={this.props.removeItem}
                            setTitle={this.props.setTitle}
                        />
                    );
                })}
                {this.maybeRenderDraggingItem()}
                <ButtonContainer>
                    <Button onClick={this.props.addItem} icon="plus" intent="success" text="Add item" />
                </ButtonContainer>
            </ListWrapper>
        )
    }

    private maybeRenderDraggingItem = () => {
        const { draggingItem } = this.state;
        if (draggingItem) {
            const item = this.props.data.find((item) => item.id === draggingItem.id);
            if (item) {
                return (
                    <DragWrapper style={{ top: this.state.mouseY - draggingItem.mouseOffset }}>
                        <DragReorderableListItem
                            id={draggingItem.id}
                            title={item.title}
                            color={item.color}
                            onDrag={this.handleDragStart}
                            removeItem={this.props.removeItem}
                            setTitle={this.props.setTitle}
                        />
                    </DragWrapper>
                );
            }
        }
        return null;
    }

    private handleDragStart = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        const index = this.props.data.findIndex((item) => item.id === id);
        if (index !== undefined) {
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
            const index = this.props.data.findIndex((item) => item.id === draggingItem.id);
            const topY = this.getTopY(e.clientY, draggingItem.mouseOffset);
            const aboveItemCenter = this.getCenterY((index - 1) * CHILD_HEIGHT, CHILD_HEIGHT);
            const itemCenter = this.getCenterY((index) * CHILD_HEIGHT, CHILD_HEIGHT);
            
            if (index > 0 && topY < aboveItemCenter) {
                this.props.swapItems(index - 1, index);
            } else if (index < this.props.data.length - 1 && topY > itemCenter) {
                this.props.swapItems(index, index + 1);
            }
            this.setState({ mouseY: e.clientY });
        }
    }

    private handleMouseUp = () => {
        if (this.state.draggingItem) {
            this.setState({ draggingItem: undefined });
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
    }
}
