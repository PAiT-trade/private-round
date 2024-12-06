import styled from "styled-components";

export const AppWrapper = styled.div``;

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>;
};
