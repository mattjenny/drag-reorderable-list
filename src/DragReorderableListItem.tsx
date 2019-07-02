import React from 'react';
import styled from 'styled-components';
import { DemoListItemComponent } from './DemoListItemComponent';
import { CHILD_HEIGHT } from './constants';

const ListItem = styled.div`
    height: ${CHILD_HEIGHT}px;
    cursor: move;
`;

export interface ListItemDisplayProps {
    title: string;
    displayIndex?: number;
    id: string;
    onDrag: (id: string, e: React.MouseEvent<HTMLDivElement>) => void;
    // onResize: (id: string, height: number) => void;
}

export interface OwnProps extends ListItemDisplayProps {}

interface State {
    isSelected: boolean;
    isDragging: boolean;
}

export class DragReorderableListItem extends React.PureComponent<OwnProps, State> {
    private el: HTMLDivElement | null | undefined;
    public state = {
        isSelected: false,
        isDragging: false,
    };

    // public componentDidMount() {
    //     if (this.el) {
    //         this.props.onResize(this.props.id, this.el.getBoundingClientRect().height);
    //     }
    // }

    public render() {
        return (
            <ListItem ref={el => this.el = el} onMouseDown={this.handleMouseDown}>
                <DemoListItemComponent {...this.props} />
            </ListItem>
        )
    }

    private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this.props.onDrag(this.props.id, e);
    }

    private handleMouseUp = () => {
        if (this.state.isDragging) {
            this.setState({ isDragging: false });
        }
    }
}
