import {ConstructorType, GenericClassDecorator} from '../types/Types'
import {simstanceManager} from '../../../../com/simple/boot/simstance/SimstanceManager'

export const Sim = (): GenericClassDecorator<ConstructorType<any>> => {
    return (target: ConstructorType<any>) => {
        // console.log('sim reg')
        simstanceManager.register(target)
        // console.log('sim reged')
    }
}
