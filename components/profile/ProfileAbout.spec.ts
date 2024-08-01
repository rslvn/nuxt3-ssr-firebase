import {mount} from '@vue/test-utils'
import {expect, test} from 'vitest'
import {ProfileAbout} from '#components'
import {UserProfile} from '~/types'
import {i18nSetup} from '~/test/utils/i18n-test-utils'

i18nSetup()

const userProfile: UserProfile = {
  coverPhoto: null, profilePhoto: null, username: 'me'
}

test('ProfileAbout > no about text', async () => {
  const component = mount(ProfileAbout, {props: {userProfile}})
  expect(component.vm).toBeTruthy()
  expect(component.text()).toBe('About')
  expect(component.find('#profile-about').text()).toBe('')
})

test('ProfileAbout > has about text', async () => {
  userProfile.about = 'lorem ipsum'
  const component = mount(ProfileAbout, {props: {userProfile}})
  expect(component.vm).toBeTruthy()
  expect(component.find('p').text()).toBe('About')
  expect(component.find('#profile-about').text()).toBe(userProfile.about)
})