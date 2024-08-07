import {z} from 'zod'

export default function () {
  const {t, locale} = useI18n()
  const {getUserProfileByUsername} = useUserProfileCollection()

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
      required: true
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
      required: true
    }
  })

  const oldPassword = computed(() => {
    if (!locale) {
      return null
    }
    return {
      name: 'oldPassword',
      type: 'password',
      label: t('field.oldPassword.label'),
      placeholder: t('field.oldPassword.placeholder'),
      description: t('field.oldPassword.description'),
      color: 'gray',
      required: true
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
      required: true
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
      required: true
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
      required: false
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
      required: true
    }
  })

  const username = computed(() => {
    if (!locale) {
      return null
    }
    return {
      name: 'username',
      type: 'username',
      label: t('field.username.label'),
      placeholder: t('field.username.placeholder'),
      description: t('field.username.description'),
      color: 'gray',
      required: true,
    }
  })

  const country = computed(() => {
    if (!locale) {
      return null
    }
    return {
      name: 'country',
      type: 'text',
      label: t('field.country.label'),
      placeholder: t('field.country.placeholder'),
      description: t('field.country.description'),
      color: 'gray',
      required: true,
    }
  })

  const about = computed(() => {
    if (!locale) {
      return null
    }
    return {
      name: 'about',
      type: 'text',
      label: t('field.about.label'),
      placeholder: t('field.about.placeholder'),
      description: t('field.about.description'),
      color: 'gray',
      required: false
    }
  })

  const schemaConfig: any = {
    email: z.string().email(),
    password: z.string().min(6).max(32),
    confirmPassword: z.string().min(6).max(32),
    oldPassword: z.string().min(6).max(32),
    firstName: z.string().min(2).max(32),
    middleName: z.optional(z.string().max(64)),
    lastName: z.string().min(2).max(64),
    username: z.string().min(5).max(32).refine(async (username: string) => !(await getUserProfileByUsername(username)), username => ({
      message: t('validation.username', {username}),
    })),
    country: z.string(),
    about: z.optional(z.string().max(512)),

  }

  const getSchema = (fields: { name: string }[]) => {
    const shape = fields.reduce((previousValue: any, currentValue) => {
      previousValue[currentValue.name] = schemaConfig[currentValue.name]
      return previousValue
    }, {})
    const schema = z.object(shape)
    const confirmPasswordField = fields.find(field => field.name === confirmPassword.value.name)
    if (!confirmPasswordField) {
      return schema
    }
    return schema.refine((data: any) => data.password === data.confirmPassword, {
      message: t('validation.confirmPassword'),
      path: ['confirmPassword'],
    })
  }

  return {
    email,
    password,
    confirmPassword,
    country,
    oldPassword,
    firstName,
    middleName,
    lastName,
    username,
    about,
    getSchema
  }
}