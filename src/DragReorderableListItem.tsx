import React from 'react';
import styled from 'styled-components';
import { DemoListItemComponent } from './DemoListItemComponent';

const ListItem = styled.li`

`;

export interface ListItemDisplayProps {
    title: string;
    displayIndex: number;
}

export interface OwnProps extends ListItemDisplayProps {}

export class DragReorderableListItem extends React.PureComponent<OwnProps, {}> {
    public render() {
        return (
            <ListItem>
                <DemoListItemComponent {...this.props} />
            </ListItem>
        )
    }
}
