import {UseSeoMetaInput} from '@unhead/schema';
import {PageConfig} from '~/types';

export default function () {
    const {t} = useI18n()
    const runtimeConfig = useRuntimeConfig()

    const seoMetaInputByPageConfig = (pageConfig: PageConfig): UseSeoMetaInput => {
        const title = t(pageConfig.title.key, pageConfig.title.params)
        const description = t(pageConfig.description.key, pageConfig.description.params)
        const image = runtimeConfig.public.url + '/img/tangowall-cover-20240206.png'
        const pageUrl = runtimeConfig.public.url + pageConfig.path
        return {
            title,
            description,
            ogTitle: title,
            ogDescription: description,
            ogUrl: pageUrl,
            ogImage: image,
            twitterCard: 'summary_large_image',
            twitterTitle: title,
            twitterDescription: description,
            twitterImage: image
        }
    }

    return {
        seoMetaInputByPageConfig
    }
}