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
package pub.doric.shader;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Region;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

/**
 * @Description: com.github.penfeizhou.doric.shader
 * @Author: pengfei.zhou
 * @CreateDate: 2019-07-31
 */
public class DoricLayer extends MaximumFrameLayout {
    private final Path mCornerPath = new Path();
    private Paint mShadowPaint;
    private Paint mBorderPaint;
    private final RectF mRect = new RectF();
    private float[] mCornerRadii;

    public DoricLayer(@NonNull Context context) {
        super(context);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }

    @Override
    public void draw(Canvas canvas) {
        mRect.left = 0;
        mRect.right = getWidth();
        mRect.top = 0;
        mRect.bottom = getHeight();
        if (mCornerRadii != null) {
            canvas.save();
            mCornerPath.reset();
            mCornerPath.addRoundRect(mRect, mCornerRadii, Path.Direction.CW);
            canvas.clipPath(mCornerPath);
        }
        super.draw(canvas);
    }

    @Override
    protected boolean drawChild(Canvas canvas, View child, long drawingTime) {
        return super.drawChild(canvas, child, drawingTime);
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {
        mRect.left = 0;
        mRect.right = getWidth();
        mRect.top = 0;
        mRect.bottom = getHeight();
        if (mCornerRadii != null) {
            canvas.restore();
        }
        canvas.save();
        if (mCornerRadii != null) {
            mCornerPath.reset();
            mCornerPath.addRoundRect(mRect, mCornerRadii, Path.Direction.CW);
            canvas.clipPath(mCornerPath);
        }

        super.dispatchDraw(canvas);
        canvas.restore();
        // draw border
        if (mBorderPaint != null) {
            ((ViewGroup) getParent()).setClipChildren(false);
            if (mCornerRadii != null) {
                if (mCornerRadii.length == 8 && (
                        mCornerRadii[0] != mCornerRadii[2]
                                || mCornerRadii[0] != mCornerRadii[4]
                                || mCornerRadii[0] != mCornerRadii[6]
                )) {
                    canvas.save();
                    canvas.clipPath(mCornerPath);
                    canvas.drawPath(mCornerPath, mBorderPaint);
                    canvas.restore();
                } else {
                    canvas.save();
                    canvas.clipPath(mCornerPath);
                    canvas.drawRoundRect(mRect, mCornerRadii[0], mCornerRadii[1], mBorderPaint);
                    canvas.restore();
                }
            } else {
                canvas.save();
                canvas.clipRect(mRect);
                canvas.drawRect(mRect, mBorderPaint);
                canvas.restore();
            }
        }
        if (mShadowPaint != null) {
            ((ViewGroup) getParent()).setClipChildren(false);
            canvas.save();
            if (mCornerRadii != null) {
                canvas.clipPath(mCornerPath, Region.Op.DIFFERENCE);
                if (mCornerRadii.length == 8 && (
                        mCornerRadii[0] != mCornerRadii[2]
                                || mCornerRadii[0] != mCornerRadii[4]
                                || mCornerRadii[0] != mCornerRadii[6]
                )) {
                    canvas.drawPath(mCornerPath, mShadowPaint);
                } else {
                    canvas.drawRoundRect(mRect, mCornerRadii[0], mCornerRadii[1], mShadowPaint);
                }
            } else {
                canvas.clipRect(mRect, Region.Op.DIFFERENCE);
                canvas.drawRect(mRect, mShadowPaint);
            }
            canvas.restore();
        }
    }

    public void setShadow(int sdColor, int sdOpacity, int sdRadius, int offsetX, int offsetY) {
        if (mShadowPaint == null) {
            mShadowPaint = new Paint();
            mShadowPaint.setAntiAlias(false);
            mShadowPaint.setStyle(Paint.Style.FILL);
        }
        mShadowPaint.setColor(sdColor);
        mShadowPaint.setAlpha(sdOpacity);
        mShadowPaint.setShadowLayer(sdRadius, offsetX, offsetY, sdColor);
    }

    public void setBorder(int borderWidth, int borderColor) {
        if (borderWidth == 0) {
            mBorderPaint = null;
        }
        if (mBorderPaint == null) {
            mBorderPaint = new Paint();
            mBorderPaint.setAntiAlias(true);
            mBorderPaint.setStyle(Paint.Style.STROKE);
        }
        mBorderPaint.setStrokeWidth(borderWidth * 2);
        mBorderPaint.setColor(borderColor);
    }

    public void setCornerRadius(int corner) {
        setCornerRadius(corner, corner, corner, corner);
    }

    public void setCornerRadius(int leftTop, int rightTop, int rightBottom, int leftBottom) {
        mCornerRadii = new float[]{
                leftTop, leftTop,
                rightTop, rightTop,
                rightBottom, rightBottom,
                leftBottom, leftBottom,
        };
        setWillNotDraw(false);
    }

    public float getCornerRadius() {
        if (mCornerRadii != null) {
            return mCornerRadii[0];
        }
        return 0;
    }

    public void reset() {
        mCornerRadii = null;
        mBorderPaint = null;
        mShadowPaint = null;
    }
}
