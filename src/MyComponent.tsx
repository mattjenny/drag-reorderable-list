import React from 'react';
import uuid from 'uuid';
import { TestData } from './types';
import { DragReorderableList } from './DragReorderableList';

const COLORS = [
    "#DB3737",
    "#137CBD",
    "#D9822B",
    "#29A634",
    "#8F398F",
    "#D99E0B",
]

interface State {
    data: Array<TestData>;
}

function swap(arr: Array<TestData>, idx1: number, idx2: number): Array<TestData> {
    return arr.map((data, idx) => {
        if (idx === idx1) {
            return arr[idx2];
        } else if (idx === idx2) {
            return arr[idx1];
        }
        return data;
    })
}

function getNextColor(listSize: number) {
    const idx = listSize % COLORS.length;
    return COLORS[idx];
}

export class MyComponent extends React.PureComponent<{}, State> {
    public state: State = {
        data: [
            { id: "t1", title: "Test 1", color: getNextColor(0) },
            { id: "t2", title: "Test 2", color: getNextColor(1) },
            { id: "t3", title: "Test 3", color: getNextColor(2) },
        ],
    }

    public render() {
        return (
            <DragReorderableList
                data={this.state.data}
                swapItems={this.swapItems}
                addItem={this.addItem}
                setTitle={this.setTitle}
                removeItem={this.removeItem}
            />
        )
    }

    private swapItems = (idx1: number, idx2: number) => {
        this.setState({ data: swap(this.state.data, idx1, idx2) });
    }

    private addItem = () => {
        const id = uuid.v4();
        this.setState({
            data: [
                ...this.state.data,
                {
                    id: uuid.v4(),
                    title: 'Untitled item',
                    color: getNextColor(this.state.data.length),
                },
            ],
        });
    }

    private setTitle = (id: string, title: string) => {
        const index = this.state.data.findIndex((item) => item.id === id);
        if (index !== undefined) {
            const item = this.state.data[index];
            const nextData = [ ...this.state.data ];
            nextData[index] = {
                ...nextData[index],
                title,
            };
            this.setState({
                data: nextData,
            });
        }
    }

    private removeItem = (id: string) => {
        const index = this.state.data.findIndex((item) => item.id === id);
        if (index !== undefined) {
            this.setState({
                data: this.state.data.filter((item) => item.id !== id),
            });
        }
    }
}
