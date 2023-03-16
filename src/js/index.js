import { commentJs } from "./comment.js";
import { dashboardJs } from "./dashboard.js";
import { signupJs } from "./signup.js";
import { loginJs } from "./login.js";
import { mainJs } from "./main.js";

function indexJs() {
  commentJs();
  dashboardJs();
  signupJs();
  loginJs();
  mainJs();
}

export { indexJs };
