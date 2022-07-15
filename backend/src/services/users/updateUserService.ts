import knex from "../../database/connection";
import { number, object, SchemaOf, string } from 'yup';
import { IUserData } from "../../models/users";
import bcrypt from "bcrypt";
import { handleYupError } from '../../utils/yupValidationError';


const editUserSchema: SchemaOf<Partial<IUserData>> = object().shape({
    id: number(),
    name: string(),
    email: string().email('E-mail inválido'),
    password: string(),
    cpf: string().min(11, "CPF inválido").max(11, "CPF inválido"),
    phone: string()
})

export const editUser = async (user: IUserData) => {

    await editUserSchema.validate(user, {
        abortEarly: false
    }).catch((error) => {
        throw ({ status: 400, message: handleYupError(error) })
    })

    const { id, name, email, password, cpf, phone } = user

    const userDB = await knex("users").where({ id }).first();

    const {
        name: nameDB,
        email: emailDB,
        cpf: cpfDB,
        phone: phoneDB,
        password: passwordDB,
    } = userDB;

    const emailExist = await knex("users")
        .where({ email })
        .whereNot({ id })
        .first();

    const cpfExist = await knex("users")
        .where({ cpf })
        .whereNot({ id })
        .first();

    interface Err {
        password: string[] | string
    }
    const errors: Record<string, string | string[]> = {
        password: [" "]
    };

    const newUserData: Partial<IUserData> = { name, email, password, cpf, phone };

    if (password) {
        const checkPassword = await bcrypt.compare(password, passwordDB);
        if (checkPassword) {
            errors.password = "A senha deve ser diferente da anterior";
        } else {
            const newPasswordEncrypted = await bcrypt.hash(password, 10);
            newUserData.password = newPasswordEncrypted;
        }
    }



    if (emailExist) {
        errors.email = "E-mail já cadastrado";
    }
    if (cpfExist) {
        errors.cpf = "CPF já cadastrado";
    }
    if (errors.cpf || errors.email || errors.password) {
        throw ({ status: 400, message: errors });
    }

    if (emailDB !== email) {
        newUserData.email = email;
    }

    if (cpfDB !== cpf && cpf !== undefined) {
        newUserData.cpf = cpf;
    }

    if (phoneDB !== phone && phone !== undefined) {
        newUserData.phone = phone;
    }
    if (nameDB !== name) {
        newUserData.name = name;
    }
    const { password: oldPassword, ...userData } = userDB;

    const newUserDB = { ...userData, ...newUserData };

    if (Object.keys(newUserData)[0]) {
        await knex("users").where({ id }).update(newUserData);
    }

    return newUserDB



}

