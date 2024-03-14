import {z} from 'zod';

export default function () {
    const {t, locale} = useI18n()

    const email = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'email',
            type: 'mail',
            label: t('field.emailAddress.label'),
            placeholder: t('field.emailAddress.placeholder'),
            color: 'gray',
        }
    })
    const password = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'password',
            type: 'password',
            label: t('field.password.label'),
            placeholder: t('field.password.placeholder'),
            color: 'gray',
        }
    })
    const confirmPassword = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'confirmPassword',
            type: 'password',
            label: t('field.confirmPassword.label'),
            placeholder: t('field.confirmPassword.placeholder'),
            color: 'gray',
        }
    })
    const firstName = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'firstName',
            type: 'text',
            label: t('field.firstName.label'),
            placeholder: t('field.firstName.placeholder'),
            description: t('field.firstName.description'),
            color: 'gray',
        }
    })

    const middleName = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'middleName',
            type: 'text',
            label: t('field.middleName.label'),
            placeholder: t('field.middleName.placeholder'),
            description: t('field.middleName.description'),
            color: 'gray',
        }
    })

    const lastName = computed(() => {
        if (!locale) {
            return null
        }
        return {
            name: 'lastName',
            type: 'text',
            label: t('field.lastName.label'),
            placeholder: t('field.lastName.placeholder'),
            description: t('field.lastName.description'),
            color: 'gray',
        }
    })

    const schemaConfig: any = {
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        firstName: z.optional(z.string()),
        middleName: z.optional(z.string()),
        lastName: z.optional(z.string()),
    }

    const getSchema = (fields: { name: string }[]) => {
        const shape = fields.reduce((previousValue: any, currentValue) => {
            previousValue[currentValue.name] = schemaConfig[currentValue.name]
            return previousValue
        }, {})
        const schema = z.object(shape)
        const confirmPasswordField = fields.find((field) => field.name === confirmPassword.value.name)
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
        firstName,
        middleName,
        lastName,
        getSchema
    }
}