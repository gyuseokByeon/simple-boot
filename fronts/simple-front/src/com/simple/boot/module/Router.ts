import {Module} from '../../../../com/simple/boot/module/Module'
import {ConstructorType} from '../../../../com/simple/boot/types/Types'
import {simstanceManager} from '../../../../com/simple/boot/simstance/SimstanceManager'
import {LocationUtils} from '../../../../com/simple/boot/util/window/LocationUtils'

export interface Routers {
    [name: string]: ConstructorType<any> | any
}

export class Router implements Routers {
    constructor(public path: string, public module?: ConstructorType<Module>, public childs: ConstructorType<Router>[] = []) {
    }

    getExecuteModule(parentRouters: Router[]): Module | undefined {
        const path = LocationUtils.hash();
        const routerStrings = parentRouters.map(it => it.path || '')
        const isRoot = this.isRootUrl(routerStrings, path)
        console.log('getExecuteModule -> ', isRoot, parentRouters, routerStrings, path, this.path);
        if (isRoot) {
            parentRouters.push(this);
            const fieldModule = this.routing(routerStrings, path)
            if (fieldModule) {
                return fieldModule;
            } else {
                for (const child of this.childs) {
                    const route = simstanceManager.getOrNewSim(child)
                    const executeModule = route.getExecuteModule(parentRouters)
                    if (route && executeModule) {
                        return executeModule
                    }
                }
            }
        }
    }

    get moduleObject() {
        if (this.module) {
            return simstanceManager.getOrNewSim(this.module)
        }
    }

    public isRootUrl(parentRoots: string[], hashUrl: string): boolean {
        return hashUrl.startsWith(parentRoots.join('') + (this.path || ''))
    }

    // my field find
    public routing(parentRoots: string[], path: string): Module | undefined {
        console.log('--routing-->', parentRoots, path)
        const routers = this as Routers
        const urlRoot = parentRoots.join('') + this.path
        const regex = new RegExp('^' + urlRoot, 'i')
        path = path.replace(regex, '')
        const fieldModule = (routers[path] as ConstructorType<any>)
        console.log('routing path ', this.path, path, fieldModule)
        if (fieldModule) {
            return simstanceManager.getOrNewSim(fieldModule)
        }
    }
}
