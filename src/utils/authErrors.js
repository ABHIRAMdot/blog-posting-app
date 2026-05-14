export const getAuthErrorMessage = (code) => {

    switch (code) {

        case "auth/invalid-credential":
            return "Invalid email or password";

        case "auth/email-already-in-use":
            return "Email already exists";

        case "auth/weak-password":
            return "Password should be at least 6 characters";

        case "auth/invalid-email":
            return "Invalid email format";

        default:
            return "Something went wrong. Please try again.";
    }
};