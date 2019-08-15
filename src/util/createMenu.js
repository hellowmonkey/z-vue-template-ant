import menu from '../config/menu'
import { routes } from '../router'

const eachRoutes = (routes, rets = []) => {
    routes.map(item => {
        if (item.children) {
            eachRoutes(item.children, rets)
        } else {
            rets.push(item)
        }
    })
}

const eachMenus = (menus, routers, parent) => {
    menus.map((item, key) => {
        if (item.children) {
            eachMenus(item.children, routers, item)
        } else {
            const { name } = item
            if (!name) return
            const router = routers.filter(route => route.name === name)[0]
            if (!router) return
            if (parent && router.meta.role) {
                if (!parent.role) {
                    parent.role = []
                }
                parent.role.push(...router.meta.role)
            }
            menus[key] = Object.assign(router.meta, item)
        }
    })
}

export default () => {
    const routers = []
    const menus = JSON.parse(JSON.stringify(menu))
    eachRoutes(routes, routers)
    eachMenus(menus, routers)
    return menus
}
