/*
 * Copyright [2021] [Doric.Pub]
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
package pub.doric.resource;

import java.io.InputStream;

import pub.doric.DoricContext;
import pub.doric.async.AsyncResult;

/**
 * @Description: This represents an android resource like a drawable from R.drawable
 * @Author: pengfei.zhou
 * @CreateDate: 2021/10/20
 */
public class DoricAndroidResource extends DoricResource {
    private final String defType;
    private final String identifier;

    public DoricAndroidResource(String defType, String identifier, DoricContext doricContext) {
        super(doricContext);
        this.defType = defType;
        this.identifier = identifier;
    }

    @Override
    public AsyncResult<InputStream> asInputStream() {
        AsyncResult<InputStream> result = new AsyncResult<>();
        int resId = doricContext.getContext().getResources().getIdentifier(
                identifier,
                defType,
                doricContext.getContext().getPackageName());
        if (resId > 0) {
            result.setResult(doricContext.getContext().getResources().openRawResource(resId));
        } else {
            result.setError(new Throwable("Cannot find resource for :" + identifier + ",type = " + defType));
        }
        return result;
    }
}
