import {z} from "zod";

export default function () {
    const {t} = useI18n()

    const email = {
        name: 'email',
        type: 'mail',
        label: t('field.emailAddress.label'),
        placeholder: t('field.emailAddress.placeholder'),
        color: 'gray',
    }
    const password = {
        name: 'password',
        type: 'password',
        label: t('field.password.label'),
        placeholder: t('field.password.placeholder'),
        color: 'gray',
    }
    const confirmPassword = {
        name: 'confirmPassword',
        type: 'password',
        label: t('field.confirmPassword.label'),
        placeholder: t('field.confirmPassword.placeholder'),
        color: 'gray',
    }

    const schemaConfig: any = {
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6)
    }

    const getSchema = (fields: { name: string }[]) => {
        const shape = fields.reduce((previousValue: any, currentValue) => {
            previousValue[currentValue.name] = schemaConfig[currentValue.name]
            return previousValue
        }, {})
        const schema = z.object(shape)
        const confirmPasswordField = fields.find((field) => field.name === confirmPassword.name)
        if (!confirmPasswordField) {
            return schema
        }
        return schema.refine((data: any) => data.password === data.confirmPassword, {
            message: t('validation.confirmPassword'),
            path: ["confirmPassword"],
        })
    }

    return {
        email,
        password,
        confirmPassword,
        getSchema
    }
}