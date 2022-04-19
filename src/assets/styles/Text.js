import styled from "styled-components/native";

const Text = styled.Text`
  color: ${(props) =>
    props.colorLight ? "rgba(26, 27, 29, 0.4)" : "rgba(26, 27, 29, 1)"};
  font-weight: ${(props) => (props.textbold ? "700" : "normal")};
  font-size: 16px;

  ${({ textlarge, textsmall }) => {
    switch (true) {
      case textlarge:
        return "font-size: 20px;";
      case textsmall:
        return "font-size: 13px";
    }
  }}
`;

const TitleText = styled.Text`
  font-size: 26px;
  font-weight: 700'; 

  ${({ textdark, textlight  }) => {
    switch (true) {
      case textdark:
        return "color: #1A1B1D;";
      case textlight:
        return "color: white";
    }
  }}
`;

export { Text, TitleText };
