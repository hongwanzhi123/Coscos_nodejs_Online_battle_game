import { _decorator, Component, EventTouch, Input, input, instantiate, IVec2, Node, UITransform, Vec2 } from 'cc';
import { EntityTypeEnum, IBullet, InputTypeEnum } from '../Common';
import { WeaponManager } from '../Weapon/WeaponManager';
import { EntityManager } from '../Base/EntityManager';
import { EntityStateEnum, EventEnum, PrefabPathEnum } from '../Enum';
import DataManager from '../Global/DataManager';
import { rad2Angle } from '../Utils';
import EventManager from '../Global/EventManager';
import { ExplosionStateMachine } from './ExplosionStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ExplosionManager')
export class ExplosionManager extends EntityManager {

    type: EntityTypeEnum;
    id: number;

    init(type:EntityTypeEnum,{x,y}:IVec2) {

       this.node.setPosition(x,y);
       this.fsm = this.addComponent(ExplosionStateMachine);
       this.fsm.init(type);
       this.type = type;
       this.state = EntityStateEnum.Idle;


    }


}


