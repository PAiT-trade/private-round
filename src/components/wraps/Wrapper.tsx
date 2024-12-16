import styled from "styled-components";

export const AppWrapper = styled.div`
  min-width: 100%;
  overflow-x: hidden !important;
`;

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>;
};
