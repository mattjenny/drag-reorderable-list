import React from 'react';
import styled from 'styled-components';
import { DragReorderableListItem } from './DragReorderableListItem';

const ListWrapper = styled.ol`
    list-style-type: none;
    padding-inline-start: 0;
`;

interface TestData {
    title: string;
}

interface ChildElement {
    id: string;
    height: number;
    data: TestData;
}

interface State {
    draggingItem: DragData | undefined;
    childElements: Array<ChildElement>;
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
    public state = {
        draggingItem: undefined,
        childElements: testData.map((item) => ({
            id: item.id,
            height: 100,
            data: { title: item.title },
        })),
    }

    public componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    public componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    public render() {
        return (
            <ListWrapper>
                {this.state.childElements.map((item, idx) => (
                    <DragReorderableListItem
                        key={item.id}
                        id={item.id}
                        title={item.data.title}
                        displayIndex={idx + 1}
                        height={item.height}
                        onDrag={this.handleDragStart}
                        onResize={this.childResized}
                    />
                ))}
            </ListWrapper>
        )
    }

    private handleDragStart = (id: string, e: React.MouseEvent<HTMLLIElement>) => {
        const childElement = this.state.childElements.find((item) => item.id === id);
        if (childElement) {
            this.setState({
                draggingItem: {
                    id,
                    mouseOffset: 5,
                },
            });

            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    private handleMouseMove = (e: any) => {
        console.log('Mousemove: ', e);
    }

    private handleMouseUp = () => {
        if (this.state.draggingItem) {
            // Clean up
            this.setState({ draggingItem: undefined });
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
    }

    private childResized = (id: string, height: number) => {
        const childElementIdx = this.state.childElements.findIndex((item) => item.id === id);
        if (childElementIdx) {
            const updatedChildElements = [ ...this.state.childElements ];
            updatedChildElements[childElementIdx] = {
                ...updatedChildElements[childElementIdx],
                height,
            };
            this.setState({ childElements: updatedChildElements });
        }
    }
}
