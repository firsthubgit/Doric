/*
 * Copyright [2019] [Doric.Pub]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import './../runtime/global'
import { View, Group, Root } from "./view";
import { loge, log } from '../util/log';
import { Model } from '../util/types';


export function NativeCall(target: Panel, propertyKey: string, descriptor: PropertyDescriptor) {
    const originVal = descriptor.value
    descriptor.value = function () {
        const ret = Reflect.apply(originVal, this, arguments)
        return ret
    }
    return descriptor
}

type Frame = { width: number, height: number }

export abstract class Panel {
    context?: any
    onCreate() { }
    onDestroy() { }
    onShow() { }
    onHidden() { }

    abstract build(rootView: Group): void

    private __data__: any
    private __root__ = new Root

    getRootView() {
        return this.__root__
    }

    getInitData() {
        return this.__data__
    }

    @NativeCall
    private __init__(frame: Frame, data: any) {
        this.__data__ = data
        this.__root__.width = frame.width
        this.__root__.height = frame.height
        this.build(this.__root__)
    }

    @NativeCall
    private __onCreate__() {
        this.onCreate()
    }

    @NativeCall
    private __onDestroy__() {
        this.onDestroy()
    }

    @NativeCall
    private __onShow__() {
        this.onShow()
    }

    @NativeCall
    private __onHidden__(): void {
        this.onHidden()
    }

    @NativeCall
    private __build__() {
        this.build(this.__root__)
    }

    @NativeCall
    private __response__(viewIds: string[], callbackId: string) {
        const v = this.retrospectView(viewIds)
        if (v === undefined) {
            loge(`Cannot find view for ${viewIds}`)
        }
        const argumentsList: any = [callbackId]
        for (let i = 2; i < arguments.length; i++) {
            argumentsList.push(arguments[i])
        }
        Reflect.apply(v.responseCallback, v, argumentsList)
    }

    private retrospectView(ids: string[]): View {
        return ids.reduce((acc: View, cur) => {
            if (Reflect.has(acc, "subViewById")) {
                return Reflect.get(acc, "subViewById")(cur)
            }
            return acc
        }, this.__root__)
    }

    private nativeRender(model: Model) {
        if (this.context) {
            this.context.shader.render(model)
        }
    }

    private hookBeforeNativeCall() {
    }

    private hookAfterNativeCall() {
        if (this.__root__.isDirty()) {
            const model = this.__root__.toModel()
            this.nativeRender(model)
            this.__root__.clean()
        }
    }

}