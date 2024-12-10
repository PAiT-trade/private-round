import styled from "styled-components";

/** background image */
export const BackgroundImage = styled.div<{
  position: string;
  width: string;
  height: string;
  img: string;
}>`
  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "100px"};
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: ${({ position }) => position || "center"};
`;
