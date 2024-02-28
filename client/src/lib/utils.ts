import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const htmlTemplate = (email: string, userName: string, courseName: string) => `
<html>
    <head>
        <style type='text/css'>
            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: #e4e4e7;
                display: table;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;
            }
            .container {
                background:#1f2937;
                border: 20px solid #a855f7;
                width: 750px;
                height: 550px;
                display: table-cell;
                vertical-align: middle;
            }
            .logo {
                color: #a855f7;
            }

            .marquee {
                color: #a855f7;
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
            }
            .person {
                border-bottom: 2px solid white;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
            }
            .reason {
                margin: 20px;
            }
        
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                Skill Skulpt
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                ${userName}
            </div>

            <div class="reason">
                For completing the course on<br/>
                ${courseName}
            </div>
        </div>
    </body>
</html>
`;
