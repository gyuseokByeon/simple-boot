import {Sim} from '@src/com/simple/boot/decorators/SimDecorator'
// import {ModuleProperty} from '@src/com/simple/boot/types/Types'
// import {Module} from '@src/com/simple/boot/module/Module'
import {AjaxService} from '@src/com/simple/boot/service/AjaxService'
import {BehaviorSubject} from 'rxjs'
import {ModuleProperty} from '@src/com/simple/boot/types/Types'
import {Module} from '@src/com/simple/boot/module/Module'
// import {ModuleProperty} from '@src/com/simple/boot/types/Types'
// import {Renderer} from '@src/com/simple/boot/render/Renderer'

// import {BehaviorSubject} from 'rxjs'

@Sim()
// export class I18nService implements ModuleProperty {
export class I18nService {
    public i18n$ = new BehaviorSubject(undefined as unknown as ModuleProperty)
    // public i18n$ = new BehaviorSubject({} as ModuleProperty)
    // public i18n$ = new BehaviorSubject({} as { [key: string]: string })

    constructor(public ajaxService: AjaxService) {
        console.log('I18nService constructor', this.i18n$)
        this.reload()
    }

    public reload(lang = 'ko'): void {
        this.ajaxService.getJSON<{ [key: string]: string }>(`/i18n?lang=${lang}`).subscribe(it => {
            // const rtn = {} as { [key: string]: string }
            const rtn = {} as ModuleProperty
            for (const key in it) {
                rtn[key] = new class extends Module {
                    wrapElement = 'span'
                    selector = '#__I18nService__' + key
                    public data = it[key]
                    template = '{{data}}'
                }()
            }
            this.i18n$.next(rtn);
            // Object.assign(this, it)
        })
    }

    // subscribe(next?: (value: { [key: string]: string }) => void, error?: (error: any) => void, complete?: () => void) {
    subscribe(next?: (value: ModuleProperty) => void, error?: (error: any) => void, complete?: () => void) {
        return this.i18n$.subscribe(next, error, complete)
    }
}