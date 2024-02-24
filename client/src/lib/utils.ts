import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const htmlTemplate = (email: string, userId: string, courseId: string) => `
<div id="root" style="background-color:#16a34a; font-size: 16px;width: 100%;height: 100%;	padding: 25px;
">
<span id="logo" style="margin: 0 auto;display: block;
	text-align: center;
	color: #fff;
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 20px;">Skill Skulpt</span>
<div id="content" style="margin: 0 auto;background-color: #fff;
	border-radius: 5px;
	padding: 15px;
	width: 600px;">
  <p>Hello ${email},</p>
  <p>Congratulations on completing course ${courseId} with userId ${userId}</p>
</div>
</div>`;
