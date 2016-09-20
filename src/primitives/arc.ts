

import {degToRad} from "../utils/math";
/**
 * @author rlapin
 */
export class Arc{
    private _cx:number;
    private _cy:number;
    private _r:number;
    private _startAngle:number;
    private _endAngle:number;
    private _ccw:boolean;

    public static create() {
        return new Arc();
    }

    /**
     * Define radius of the arc and return self
     * @param radius - new radius in units
     * @returns Arc - return arc with new radius
     */
    public radius(radius:number):Arc;
    /**
     * @returns current width
     */
    public radius():number;
    public radius(radius?:number):(Arc | number) {
        if (arguments.length === 0) {
            return this._r;
        } else {
            this._r = radius;
            return this;
        }
    }
    /**
     * Define startAngle of the arc and return self
     * @param startAngle - angle in degrees
     * @returns Arc - return arc with new startAngle
     */
    public startAngle(startAngle:number):Arc;
    /**
     * @returns current startAngle in degrees
     */
    public startAngle():number;
    public startAngle(startAngle?:number):(Arc | number) {
        if (arguments.length === 0) {
            return this._startAngle;
        } else {
            this._startAngle = startAngle;
            return this;
        }
    }
    /**
     * Define endAngle of the arc and return self
     * @param endAngle - angle in degrees
     * @returns Arc - return arc with new endAngle
     */
    public endAngle(endAngle:number):Arc;
    /**
     * @returns current endAngle in degrees
     */
    public endAngle():number;
    public endAngle(endAngle?:number):(Arc | number) {
        if (arguments.length === 0) {
            return this._endAngle;
        } else {
            this._endAngle = endAngle;
            return this;
        }
    }
    /**
     * Define ccw of the arc and return self
     * @param ccw - draw arc as counterclockwise
     * @returns Arc - return arc with new ccw value
     */
    public ccw(ccw:boolean):Arc;
    /**
     * @returns current ccw value
     */
    public ccw():boolean;
    public ccw(ccw?:boolean):(Arc | boolean) {
        if (arguments.length === 0) {
            return this._ccw;
        } else {
            this._ccw = ccw;
            return this;
        }
    }
    /**
     * @returns length of the arc
     */
    public length():number{
        return degToRad(this.angle())*this._r;
    }
    /**
     * Return arc angle in degrees
     */
    public angle() {
        let angle:number;
        if(this._ccw){
            angle = this._startAngle - this._endAngle;
        }else{
            angle = this._endAngle - this._startAngle;
        }
        if(angle < 0){
            angle = (360-Math.abs(angle%360));
        }
        return angle;
    }
}