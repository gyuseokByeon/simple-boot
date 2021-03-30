import {Sim} from 'simple-boot-front/src/com/simple/boot/decorators/SimDecorator'
import {Module} from 'simple-boot-front/src/com/simple/boot/module/Module'
import html from './index.html'
import {ViewService} from 'simple-boot-front/src/com/simple/boot/service/view/ViewService'
import {RandomUtils} from 'simple-boot-front/src/com/simple/boot/util/random/RandomUtils'
import {View} from "simple-boot-front/src/com/simple/boot/service/view/View";

@Sim()
export class Index extends Module {
    template = html;
    public title = new class extends Module {
        public data = '';
    }
    public numbers = new class extends Module {
        public datas = [1, 2, 3];
        template = '<ul>{{#each datas as |data i|}}<li>{{data}}</li>{{/each}}</ul>'
    }
    constructor(public v: ViewService) {
        super('index')
    }

    onInit() {
    }

    changeText($event: KeyboardEvent, view: View<Element>) {
        this.title.data = view.value;
    }
    changeData() {
        this.numbers.datas = [Math.floor(RandomUtils.random(1, 400)), Math.floor(RandomUtils.random(1, 400)), Math.floor(RandomUtils.random(1, 400))];
    }
}
