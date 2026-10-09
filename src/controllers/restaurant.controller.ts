import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService();

/** Safely sends an alert (and optional redirect) to the browser */
const alertAndRedirect = (res: Response, message: string, url?: string) => {
  const safeMessage = JSON.stringify(message).replace(/</g, "\\u003c");
  const redirect = url
    ? ` window.location.replace(${JSON.stringify(url)});`
    : "";
  res.send(`<script>alert(${safeMessage});${redirect}</script>`);
};

const getErrorMessage = (err: unknown): string =>
  err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome:", err);
    res.status(500).send(Message.SOMETHING_WENT_WRONG);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberImage = req.file?.path; // uploaded image path
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);
    req.session.member = result;
    req.session.save(() => {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    alertAndRedirect(res, getErrorMessage(err), "/admin/signup");
  }
};

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(() => {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin:", err);
    alertAndRedirect(res, getErrorMessage(err), "/admin/login");
  }
};

restaurantController.logout = (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(() => {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

restaurantController.checkAuthSession = (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) {
      alertAndRedirect(res, req.session.member.memberNick);
    } else {
      alertAndRedirect(res, Message.NOT_AUTHENTICATED);
    }
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.status(500).send(Message.SOMETHING_WENT_WRONG);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    alertAndRedirect(res, Message.NOT_AUTHENTICATED, "/admin/login");
  }
};

export default restaurantController;