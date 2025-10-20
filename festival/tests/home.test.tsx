import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders CTA links", () => {
    render(<Home />);
    expect(screen.getByText(/프로그램/)).toBeInTheDocument();
    expect(screen.getByText(/E-Sports/)).toBeInTheDocument();
  });
});
