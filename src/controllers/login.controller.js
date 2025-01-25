/* import filesystem from "fs";
import Jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = {
            email: null,
            password: null,
        };

        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Debe ingresar un email válido";
        }

        if (!password) {
            errors.password = "Debe ingresar una contraseña";
        }

        if (Object.values(errors).some((error) => error)) {
            return res.json({
                message: "Hay errores!",
                ok: false,
                status: 400,
                errors: errors,
            });
        }

        let users_info;
        try {
            const fileContent = await filesystem.promises.readFile(
                "./data/users.json",
                { encoding: "utf-8" }
            );
            users_info = JSON.parse(fileContent);
        } catch (error) {
            console.error("Error al leer o parsear el archivo JSON:", error);
            return res.json({
                ok: false,
                status: 500,
                message: "Error interno al procesar la información del usuario",
            });
        }

        if (!Array.isArray(users_info.users)) {
            return res.json({
                ok: false,
                status: 500,
                message: "Formato inválido del archivo de usuarios",
            });
        }



        const user_found = await User.findOne({ email })

        if (!user_found) {
            return res.json({
                ok: false,
                status: 404,
                message: "Este usuario no existe",
            });
        }
        const isSamePassword = await bcrypt.compare(password, user_found.password)
        if (!isSamePassword) {
            return res.json({
                ok: false,
                status: 400,
                message: "Contraseña incorrecta",
            });
        }

        const user_info = {
            id: user_found._id,
            name: user_found.name,
            email: user_found.email,
        };

        const access_token = Jwt.sign(user_info, ENVIROMENT.SECRET_KEY_JWT);

        return res.json({
            ok: true,
            status: 200,
            message: "Login exitoso",
            data: {
                user_info: {
                    id:user_found._id,
                    name: user_found.name,
                    email: user_found.email
                },
                access_token: access_token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            message: "Internal server error",
            status: 500,
        });
    }
}; */