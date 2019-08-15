import AMapJS from 'amap-js'
import config from '../config'

export default new AMapJS.AMapJSAPILoader({ key: config.amapkey }).load()
