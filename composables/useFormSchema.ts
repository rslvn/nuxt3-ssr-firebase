import {
  object,
  ref as yupRef,
  string
} from 'yup'

export default function () {
  const { t } = useI18n()
  const { getUserProfileByUsername } = useUserProfileCollection()

  const email = {
    name: 'email',
    type: 'mail',
    label: 'field.email.label',
    placeholder: 'field.email.placeholder',
    color: 'gray',
    required: true
  }

  const password = {
    name: 'password',
    type: 'password',
    label: 'field.password.label',
    placeholder: 'field.password.placeholder',
    color: 'gray',
    required: true
  }

  const oldPassword = {
    name: 'oldPassword',
    type: 'password',
    label: 'field.oldPassword.label',
    placeholder: 'field.oldPassword.placeholder',
    description: 'field.oldPassword.description',
    color: 'gray',
    required: true
  }
  const confirmPassword = {
    name: 'confirmPassword',
    type: 'password',
    label: 'field.confirmPassword.label',
    placeholder: 'field.confirmPassword.placeholder',
    color: 'gray',
    required: true
  }
  const firstName = {
    name: 'firstName',
    type: 'text',
    label: 'field.firstName.label',
    placeholder: 'field.firstName.placeholder',
    description: 'field.firstName.description',
    color: 'gray',
    required: true
  }

  const middleName = {
    name: 'middleName',
    type: 'text',
    label: t('field.middleName.label'),
    placeholder: 'field.middleName.placeholder',
    description: 'field.middleName.description',
    color: 'gray',
    required: false
  }

  const lastName = {
    name: 'lastName',
    type: 'text',
    label: 'field.lastName.label',
    placeholder: 'field.lastName.placeholder',
    description: 'field.lastName.description',
    color: 'gray',
    required: true
  }

  const username = {
    name: 'username',
    type: 'username',
    label: 'field.username.label',
    placeholder: 'field.username.placeholder',
    description: 'field.username.description',
    color: 'gray',
    required: true,
  }

  const country = {
    name: 'country',
    type: 'text',
    label: t('field.country.label'),
    placeholder: 'field.country.placeholder',
    description: 'field.country.description',
    color: 'gray',
    required: true,
  }

  const about = {
    name: 'about',
    type: 'text',
    label: 'field.about.label',
    placeholder: 'field.about.placeholder',
    description: 'field.about.description',
    color: 'gray',
    required: false
  }

  const messages = {
    required: (params: any) => t(`validation.${params.path}`, { field: t(`field.${params.path}.label`) }),
    email: (params: any) => t(`validation.${params.path}`, { field: t(`field.${params.path}.label`) }),
    min: (params: any) => t(`validation.min`, { min: params.min, field: t(`field.${params.path}.label`) }),
    max: (params: any) => t(`validation.max`, { max: params.max, field: t(`field.${params.path}.label`) }),
    confirmPassword: () => t('validation.confirmPassword'),
    username: (params: any) => t('validation.username', { username: params.value })
  }

  const schemaConfig: any = {
    email: string().email(messages.email),
    password: string().min(6, messages.min).max(32, messages.max),
    confirmPassword: string().required(messages.required).oneOf([yupRef(password.name)], messages.confirmPassword),
    oldPassword: string().min(6, messages.min).max(32, messages.max),
    firstName: string().required(messages.required).max(32, messages.max),
    middleName: string().optional().max(64, messages.max),
    lastName: string().required(messages.required).max(64, messages.max),
    username: string().min(5, messages.min).max(32, messages.max).test('username', messages.username, async (username: string) => !(await getUserProfileByUsername(username))),
    country: string(),
    about: string().optional().max(512, messages.max),
  }

  const getSchema = (fields: { name: string }[]) => {
    console.log('>>> getSchema', fields)
    const shape = fields.reduce((previousValue: any, currentValue) => {
      previousValue[currentValue.name] = schemaConfig[currentValue.name]
      return previousValue
    }, {})
    return object(shape)
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
