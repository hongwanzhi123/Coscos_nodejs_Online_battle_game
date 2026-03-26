import { _decorator, Component, EventTouch, Input, input, Node, UITransform, Vec2 } from 'cc';
import DataManager from '../../Global/DataManager';
import { IActor, InputTypeEnum } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum } from '../../Enum';
import { ActorStateMachine } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {

  

    init(data: IActor) {
       this.fsm = this.addComponent(ActorStateMachine);
       this.fsm.init(data.type);

       this.state = EntityStateEnum.Idle;
      
    }

    tick(dt){
        if(DataManager.Instance.jm.input.length()){
            const {x,y} = DataManager.Instance.jm.input;
            DataManager.Instance.applyInput({
                id: 1,
                type:InputTypeEnum.ActorMove,
                direction:{
                    x,
                    y,
                },
                dt,

            })
            this.state = EntityStateEnum.Run;
        }else{
            this.state = EntityStateEnum.Idle;
        }

        
    }

    render(data:IActor) {
        const {position,direction} = data;
        this.node.setPosition(position.x,position.y);
        if(direction.x !== 0){
            this.node.setScale(direction.x > 0 ? 1 : -1,1);
        }
    }

   

}


