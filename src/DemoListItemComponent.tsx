import React from 'react';
import styled from 'styled-components';
import { ListItemDisplayProps } from './DragReorderableListItem';

const Container = styled.div`
    padding: 20px;
    border-top: 1px solid lightgray;
`;

export class DemoListItemComponent extends React.PureComponent<ListItemDisplayProps, {}> {
    public render() {
        return (
            <Container>
                <p>{this.props.displayIndex}: {this.props.title}</p>
            </Container>
        )
    }
}
