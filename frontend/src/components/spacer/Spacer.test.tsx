import { render } from "@testing-library/react";
import Spacer from "./Spacer";

describe("<Spacer />", () => {
  it("renders a div with the spacer class", () => {
    const { container } = render(<Spacer />);
    const spacerDiv = container.querySelector(".spacer");

    expect(spacerDiv).toBeInTheDocument();
    expect(spacerDiv?.tagName).toBe("DIV");
  });
});
