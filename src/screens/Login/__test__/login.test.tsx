import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from '../../../components/Login/index'

describe("Test the Login Page", () => {
    test("render the login form submit button on the screen", async () => {
        render(<LoginForm />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });

    test("name input field should accept name ", () => {
        render(<LoginForm />);
        const name = screen.getByPlaceholderText("Enter Your Name") as HTMLInputElement || null;
        userEvent.type(name, "dummyName");
        expect(name.value).toBeDefined();

      });

      test("email input field should accept email ", () => {
        render(<LoginForm />);
        const email = screen.getByPlaceholderText("user@supermetrics.com") as HTMLInputElement || null;
        userEvent.type(email, "user");
        expect(email.value).not.toMatch("user@supermetrics.com");
      });

      test("should be able to submit the form", () => {
        const component = render(<LoginForm />);
        const email = screen.getByPlaceholderText("user@supermetrics.com") as HTMLInputElement || null;
        const name = screen.getByPlaceholderText("Enter Your Name") as HTMLInputElement || null;
        const goBtn = screen.getByRole("button");
    
        userEvent.type(name, "user");
        userEvent.type(email, "user@supermetrics.com");
        userEvent.click(goBtn);

        expect(screen.findByRole).toBeDefined();
      });
});