var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { View, Property } from "../ui/view";
import { layoutConfig } from "../util/layoutconfig";
import { Color } from "../util/color";
import { Resource } from "../util/resource";
export var ScaleType;
(function (ScaleType) {
    ScaleType[ScaleType["ScaleToFill"] = 0] = "ScaleToFill";
    ScaleType[ScaleType["ScaleAspectFit"] = 1] = "ScaleAspectFit";
    ScaleType[ScaleType["ScaleAspectFill"] = 2] = "ScaleAspectFill";
    ScaleType[ScaleType["Tile"] = 3] = "Tile";
})(ScaleType || (ScaleType = {}));
export class Image extends View {
    isAnimating(context) {
        return this.nativeChannel(context, "isAnimating")();
    }
    startAnimating(context) {
        return this.nativeChannel(context, "startAnimating")();
    }
    stopAnimating(context) {
        return this.nativeChannel(context, "stopAnimating")();
    }
    getImageInfo(context) {
        return this.nativeChannel(context, "getImageInfo")();
    }
    getImagePixels(context) {
        return this.nativeChannel(context, "getImagePixels")();
    }
    setImagePixels(context, image) {
        return this.nativeChannel(context, "setImagePixels")(image);
    }
}
__decorate([
    Property,
    __metadata("design:type", Object)
], Image.prototype, "imagePixels", void 0);
__decorate([
    Property,
    __metadata("design:type", Resource)
], Image.prototype, "image", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "imageUrl", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "imageFilePath", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "imagePath", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "imageRes", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "imageBase64", void 0);
__decorate([
    Property,
    __metadata("design:type", Number)
], Image.prototype, "scaleType", void 0);
__decorate([
    Property,
    __metadata("design:type", Boolean)
], Image.prototype, "isBlur", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "placeHolderImage", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "placeHolderImageBase64", void 0);
__decorate([
    Property,
    __metadata("design:type", Color
    /**
     * Display while image is failed to load
     * It can be file name in local path
     */
    )
], Image.prototype, "placeHolderColor", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "errorImage", void 0);
__decorate([
    Property,
    __metadata("design:type", String)
], Image.prototype, "errorImageBase64", void 0);
__decorate([
    Property,
    __metadata("design:type", Color)
], Image.prototype, "errorColor", void 0);
__decorate([
    Property,
    __metadata("design:type", Function)
], Image.prototype, "loadCallback", void 0);
__decorate([
    Property,
    __metadata("design:type", Number)
], Image.prototype, "imageScale", void 0);
__decorate([
    Property,
    __metadata("design:type", Object)
], Image.prototype, "stretchInset", void 0);
__decorate([
    Property,
    __metadata("design:type", Function)
], Image.prototype, "onAnimationEnd", void 0);
export function image(config) {
    const ret = new Image;
    ret.layoutConfig = layoutConfig().fit();
    ret.apply(config);
    return ret;
}
