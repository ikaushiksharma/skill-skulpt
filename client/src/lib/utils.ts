import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const htmlTemplate = (email: string, userName: string, courseName: string) => `
<div style=" color: #e4e4e7;
display: table;
font-family: Georgia, serif;
font-size: 24px;
text-align: center;">
<div style="background:#1f2937;
border: 20px solid #a855f7;
width: 750px;
height: 550px;
display: table-cell;
vertical-align: middle;">
<div style="color: #a855f7;">
Skill Skulpt
</div>

<div style="color: #a855f7;
font-size: 48px;
margin: 20px;">
Certificate of Completion
</div>

<div style="margin: 20px;">
This certificate is presented to
</div>

<div style="                border-bottom: 2px solid white;
font-size: 32px;
font-style: italic;
margin: 20px auto;
width: 400px;">
${userName}
</div>

<div style="margin: 20px;">
For completing the course on<br/>
${courseName}
</div>
</div>
</div>
`;
