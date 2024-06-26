import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { HeadMetaProps } from '@/components'

const meta: HeadMetaProps = {
  title: 'Catalogo e-service | PDND Interoperabilità',
  description: 'La lista degli e-service presenti su PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/catalogo`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

/** Application Data Mock */
export const itEServiceDetailsData = {
  meta,
}
