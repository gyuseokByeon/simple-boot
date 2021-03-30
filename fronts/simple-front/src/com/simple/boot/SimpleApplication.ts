import {simstanceManager} from './simstance/SimstanceManager'
import {ConstructorType} from './types/Types'
import {Router} from './module/Router'
import {fromEvent} from 'rxjs'
import {Renderer} from './render/Renderer'
import {Module} from './module/Module'

export class SimpleApplication {
    constructor(public rootRouter: ConstructorType<Router>) {
    }

    public async run(): Promise<SimpleApplication> {
        this.startRouting()
        return this
    }

    private startRouting() {
        fromEvent(window, 'hashchange').subscribe((it) => this.executeRouter())
        window.dispatchEvent(new Event('hashchange'))
    }

    private executeRouter() {
        const routers: Router[] = [];
        const executeModule = simstanceManager.getOrNewSim(this.rootRouter)?.getExecuteModule(routers)
        if (executeModule) {
            // console.log('executeRouter-->', routers, executeModule)
            let lastRouterSelector = 'app';
            routers.forEach(it => {
                this.renderRouterModule(it.moduleObject, lastRouterSelector);
                const selctor = it?.moduleObject?.router_outlet_selector || it?.moduleObject?.selector
                if (selctor) {
                    lastRouterSelector = selctor;
                }
            });
            this.render(executeModule, lastRouterSelector);
            executeModule.privateInitedChiled();
            routers.reverse().forEach(it => it.moduleObject?.privateInitedChiled());
        } else {
            Renderer.render('404 not found')
        }
    }

    public renderRouterModule(module: Module | undefined, targetSelector = 'app'): boolean {
        if (module && !module.exist()) {
            module.privateInit()
            module.renderWrap(targetSelector);
            // module.onChangedRendered()
            return true
        } else {
            return false
        }
    }

    public render(module: Module | undefined, targetSelector: string): boolean {
        if (module) {
            module.privateInit()
            module.renderWrap(targetSelector);
            // module.onChangedRendered()
            return true
        } else {
            return false
        }
    }
}
