import React from 'react';
import styled from 'styled-components';
import { DragReorderableListItem } from './DragReorderableListItem';

const ListWrapper = styled.ol`
    list-style-type: none;
    padding-inline-start: 0;
`;

export class DragReorderableList extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <ListWrapper>
                <DragReorderableListItem title="Test 1" displayIndex={1} />
                <DragReorderableListItem title="Test 2" displayIndex={2} />
                <DragReorderableListItem title="Test 3" displayIndex={3} />
            </ListWrapper>
        )
    }
}
