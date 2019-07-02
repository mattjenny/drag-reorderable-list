import React from 'react';
import styled from 'styled-components';
import { DragReorderableListItem } from './DragReorderableListItem';
import { CHILD_HEIGHT } from './constants';

const ListWrapper = styled.div`

`;

interface IDragWrapperProps {
    top: number;
}
// TODO: variable left
const DragWrapper = styled.div<IDragWrapperProps>`
    position: absolute;
    z-index: 3;
    left: 0;
    top: ${(props) => props.top}px;
    box-shadow: 3px 3px 5px 6px #ccc;
    border: 1px solid blue;
`;

const PlaceholderDiv = styled.div`
    height: ${CHILD_HEIGHT}px;
`;

interface TestData {
    title: string;
}

interface State {
    draggingItem: DragData | undefined;
    childElements: { [id: string]: TestData };
    mouseY: number;
}

const testData = [
    { id: "t1", title: "Test 1" },
    { id: "t2", title: "Test 2" },
    { id: "t3", title: "Test 3" },
]

interface DragData {
    id: string;
    mouseOffset: number;
}

export class DragReorderableList extends React.PureComponent<{}, State> {
    public state: State = {
        draggingItem: undefined,
        childElements: {
            t1: { title: "Test 1" },
            t2: { title: "Test 2" },
            t3: { title: "Test 3" },
        },
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
                {Object.keys(this.state.childElements).map((id, idx) => {
                    const item = this.state.childElements[id];
                    if (draggingItem && draggingItem.id === id) {
                        return (
                            <PlaceholderDiv />
                        )
                    }
                    return (
                        <DragReorderableListItem
                            key={id}
                            id={id}
                            title={item.title}
                            displayIndex={idx + 1}
                            onDrag={this.handleDragStart}
                        />
                    );
                })}
                {this.maybeRenderDraggingItem()}
            </ListWrapper>
        )
    }

    private maybeRenderDraggingItem = () => {
        if (this.state.draggingItem && this.state.childElements[this.state.draggingItem.id]) {
            const item = this.state.childElements[this.state.draggingItem.id];
            return (
                <DragWrapper top={this.state.mouseY - this.state.draggingItem.mouseOffset}>
                    <DragReorderableListItem
                        id={this.state.draggingItem.id}
                        title={item.title}
                        onDrag={this.handleDragStart}
                    />
                </DragWrapper>
            );
        }
    }

    private handleDragStart = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        const childElement = this.state.childElements[id];
        if (childElement) {
            this.setState({
                draggingItem: {
                    id,
                    mouseOffset: 5,
                },
                mouseY: e.clientY,
            });

            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    private handleMouseMove = (e: any) => {
        console.log('Mousemove: ', e);
        this.setState({ mouseY: e.clientY });
    }

    private handleMouseUp = () => {
        if (this.state.draggingItem) {
            // Clean up
            this.setState({ draggingItem: undefined });
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
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
