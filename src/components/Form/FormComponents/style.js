import styled from 'styled-components';

export const Draggable = styled.div.attrs(props => ({
  // Set variable of attribute: size
  padding: props.size || '1em',
}))`
  padding: ${props => props.padding};
  margin: 3px;
  border: 1px dotted silver;
  border-radius: 3px;
  display: flex;
  align-items: center;
  background: white;

  :hover {
    cursor: pointer;
  }
`;
