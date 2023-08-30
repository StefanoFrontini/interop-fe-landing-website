import { Locale } from '../configs/constants.config'
import { enHomeData } from './data/home/en'
import { itHomeData } from './data/home/it'
import { itCommonData } from './data/common/it'
import { enCommonData } from './data/common/en'
import { enProjectData } from './data/progetto/en'
import { itProjectData } from './data/progetto/it'
import { itNewsData } from './data/news/it'
import { enNewsData } from './data/news/en'
import { itNumbers } from './data/numeri/it'
import { enNumbers } from './data/numeri/en'
import { itCatalogData } from './data/catalog/it'
import { enCatalogData } from './data/catalog/en'
import { itEServiceDetailsData } from './data/e-service-details/it'
import { enEServiceDetailsData } from './data/e-service-details/en'

export const getCommonData = (locale: Locale) => {
  return locale === 'it' ? itCommonData : enCommonData
}

export const getHomeData = (locale: Locale) => {
  return locale === 'it' ? itHomeData : enHomeData
}

export const getProjectData = (locale: Locale) => {
  return locale === 'it' ? itProjectData : enProjectData
}

export const getNewsData = (locale: Locale) => {
  return locale === 'it' ? itNewsData : enNewsData
}

export const getNumbersData = (locale: Locale) => {
  return locale === 'it' ? itNumbers : enNumbers
}

export const getCatalogData = (locale: Locale) => {
  return locale === 'it' ? itCatalogData : enCatalogData
}

export const getEServiceDetailsData = (locale: Locale) => {
  return locale === 'it' ? itEServiceDetailsData : enEServiceDetailsData
}
