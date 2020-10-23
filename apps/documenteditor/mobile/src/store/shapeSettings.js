import {action, observable, computed} from 'mobx';

export class storeShapeSettings {
    getStyleGroups () {
        const styles = [
            {
                title: 'Text',
                thumb: 'shape-01.svg',
                type: 'textRect'
            },
            {
                title: 'Line',
                thumb: 'shape-02.svg',
                type: 'line'
            },
            {
                title: 'Line with arrow',
                thumb: 'shape-03.svg',
                type: 'lineWithArrow'
            },
            {
                title: 'Line with two arrows',
                thumb: 'shape-04.svg',
                type: 'lineWithTwoArrows'
            },
            {
                title: 'Rect',
                thumb: 'shape-05.svg',
                type: 'rect'
            },
            {
                title: 'Hexagon',
                thumb: 'shape-06.svg',
                type: 'hexagon'
            },
            {
                title: 'Round rect',
                thumb: 'shape-07.svg',
                type: 'roundRect'
            },
            {
                title: 'Ellipse',
                thumb: 'shape-08.svg',
                type: 'ellipse'
            },
            {
                title: 'Triangle',
                thumb: 'shape-09.svg',
                type: 'triangle'
            },
            {
                title: 'Triangle',
                thumb: 'shape-10.svg',
                type: 'rtTriangle'
            },
            {
                title: 'Trapezoid',
                thumb: 'shape-11.svg',
                type: 'trapezoid'
            },
            {
                title: 'Diamond',
                thumb: 'shape-12.svg',
                type: 'diamond'
            },
            {
                title: 'Right arrow',
                thumb: 'shape-13.svg',
                type: 'rightArrow'
            },
            {
                title: 'Left-right arrow',
                thumb: 'shape-14.svg',
                type: 'leftRightArrow'
            },
            {
                title: 'Left arrow callout',
                thumb: 'shape-15.svg',
                type: 'leftArrow'
            },
            {
                title: 'Right arrow callout',
                thumb: 'shape-16.svg',
                type: 'bentUpArrow'
            },
            {
                title: 'Flow chart off page connector',
                thumb: 'shape-17.svg',
                type: 'flowChartOffpageConnector'
            },
            {
                title: 'Heart',
                thumb: 'shape-18.svg',
                type: 'heart'
            },
            {
                title: 'Math minus',
                thumb: 'shape-19.svg',
                type: 'mathMinus'
            },
            {
                title: 'Math plus',
                thumb: 'shape-20.svg',
                type: 'mathPlus'
            },
            {
                title: 'Parallelogram',
                thumb: 'shape-21.svg',
                type: 'parallelogram'
            },
            {
                title: 'Wedge rect callout',
                thumb: 'shape-22.svg',
                type: 'wedgeRectCallout'
            },
            {
                title: 'Wedge ellipse callout',
                thumb: 'shape-23.svg',
                type: 'wedgeEllipseCallout'
            },
            {
                title: 'Cloud callout',
                thumb: 'shape-24.svg',
                type: 'cloudCallout'
            }
        ];
        const groups = [];
        let i = 0;
        for (let row=0; row<Math.floor(styles.length/4); row++) {
            const group = [];
            for (let cell=0; cell<4; cell++) {
                group.push(styles[i]);
                i++;
            }
            groups.push(group);
        }
        return groups;
    }
    wrapTypesTransform () {
        const map = [
            { ui:'inline', sdk: Asc.c_oAscWrapStyle2.Inline },
            { ui:'square', sdk: Asc.c_oAscWrapStyle2.Square },
            { ui:'tight', sdk: Asc.c_oAscWrapStyle2.Tight },
            { ui:'through', sdk: Asc.c_oAscWrapStyle2.Through },
            { ui:'top-bottom', sdk: Asc.c_oAscWrapStyle2.TopAndBottom },
            { ui:'behind', sdk: Asc.c_oAscWrapStyle2.Behind },
            { ui:'infront', sdk: Asc.c_oAscWrapStyle2.InFront }
        ];
        return {
            sdkToUi: function(type) {
                let record = map.filter(function(obj) {
                    return obj.sdk === type;
                })[0];
                return record ? record.ui : '';
            },

            uiToSdk: function(type) {
                let record = map.filter(function(obj) {
                    return obj.ui === type;
                })[0];
                return record ? record.sdk : 0;
            }
        }
    }

    getWrapType (shapeObject) {
        const wrapping = shapeObject.get_WrappingStyle();
        const shapeWrapType = this.wrapTypesTransform().sdkToUi(wrapping);
        return shapeWrapType;
    }

    transformToSdkWrapType (value) {
        const sdkType = this.wrapTypesTransform().uiToSdk(value);
        return sdkType;
    }

    getAlign (shapeObject) {
        return shapeObject.get_PositionH().get_Align();
    }

    getMoveText (shapeObject) {
        return shapeObject.get_PositionV().get_RelativeFrom() == Asc.c_oAscRelativeFromV.Paragraph;
    }

    getOverlap (shapeObject) {
        return shapeObject.get_AllowOverlap();
    }

    getWrapDistance (shapeObject) {
        return shapeObject.get_Paddings().get_Top();
    }
}