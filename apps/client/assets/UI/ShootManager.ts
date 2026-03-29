import { _decorator, Component, EventTouch, Input, input, instantiate, Node, UITransform, Vec2 } from 'cc';
import EventManager from '../Scripts/Global/EventManager';
import { EventEnum } from '../Scripts/Enum';

const { ccclass, property } = _decorator;

@ccclass('ShootManager')
export class ShootManager extends Component {

    handleShoot(){
        EventManager.Instance.emit(EventEnum.WeaponShoot);
    }


}


