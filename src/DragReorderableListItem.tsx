import React from 'react';
import styled from 'styled-components';
import { EditableText } from '@blueprintjs/core';
import { CHILD_HEIGHT } from './constants';

const Container = styled.div`
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    height: ${CHILD_HEIGHT}px;
`;

const NumberComponent = styled.div`
    flex 0 0 100px;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    height: 100%;
    border-top: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: move;
`;

const MainContent = styled.div`
    padding: 20px;
`;

export interface DragReorderableListItemProps {
    title: string;
    color: string;
    displayIndex?: number;
    id: string;
    onDrag: (id: string, e: React.MouseEvent<HTMLDivElement>) => void;
    setTitle: (id: string, title: string) => void;
}

export class DragReorderableListItem extends React.PureComponent<DragReorderableListItemProps, {}> {
    public render() {
        return (
            <Container>
                <NumberComponent onMouseDown={this.handleMouseDown} style={{ background: this.props.color }}>
                    <p>{this.props.displayIndex}</p>
                </NumberComponent>
                <MainContent>
                    <EditableText value={this.props.title} onChange={this.updateTitle}/>
                </MainContent>
            </Container>
        )
    }

    private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this.props.onDrag(this.props.id, e);
    }

    private updateTitle = (value: string) => {
        this.props.setTitle(this.props.id, value);
    }
}
