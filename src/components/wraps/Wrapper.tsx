import styled from "styled-components";

export const AppWrapper = styled.div`
  max-width: 1512px;
  margin: 0 auto;
`;

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>;
};
