import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`

`;

export interface Props {
    title: string;
    displayIndex: number;
}

export class DragReorderableListItem extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <ListItem>
                <p>{this.props.displayIndex}: {this.props.title}</p>
            </ListItem>
        )
    }
}
