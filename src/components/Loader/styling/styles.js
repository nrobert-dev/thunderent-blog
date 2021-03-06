import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.8); /* Black background with opacity */
    z-index: 200; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    display : flex;
    justify-content : center;
    align-items: center;
    overflow : hidden;
`;


