import ENVIROMENT from "../config/enviroment.js";
import transporter from "../config/mail.config.js";

export const sendMail = async ({ to, subject, html }) => {
    try {
        const data = await transporter.sendMail({ 
            from: ENVIROMENT.EMAIL_USERNAME,
            to,
            subject,
            html
        });
        console.log(data);
    } catch (error) {
        console.log("Error al enviar mail", error);
    }
};