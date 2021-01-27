import { atom } from "recoil";

export const postCommentTrigger = atom({
  key: "postCommentTrigger",
  default: { id: "", username: "", message: "" },
});
