import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, SpriteFrame, UITransform, Vec2 } from 'cc';
import DataManager from '../Global/DataManager';
import { JoyStickManager } from '../../UI/JoyStickManager';
import { ResourceManager } from '../Global/ResourceManager';
import { ActorManager } from '../Entity/Actor/ActorManager';
import { PrefabPathEnum, TexturePathEnum } from '../Enum';
import { EntityTypeEnum, InputTypeEnum } from '../Common';
import { BulletManager } from '../Bullet/BulletManager';
import { ObjectPoolManager } from '../Global/ObjectPoolManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {

  
    private stage: Node;
    private ui: Node;

    private shouleUpdate:Boolean = false;

     
    onLoad() {
       
      DataManager.Instance.stage = this.stage =  this.node.getChildByName("Stage");
      this.ui = this.node.getChildByName("UI");
      this.stage.destroyAllChildren();
      DataManager.Instance.jm = this.ui.getComponentInChildren(JoyStickManager);

    }

    async start(){
      await this.loadRes();
      this.initMap();
      this.shouleUpdate = true;
    }

    async loadRes(){
      const list = [];
      for (const type in PrefabPathEnum) {
         const p = ResourceManager.Instance.loadRes(PrefabPathEnum[type],Prefab).then((prefab)=>{
        DataManager.Instance.prefabMap.set(type,prefab);
      }); 

        list.push(p);
    }
      
      for (const type in TexturePathEnum) {
         const p = ResourceManager.Instance.loadDir(TexturePathEnum[type],SpriteFrame).then((spriteFrames)=>{
         DataManager.Instance.textureMap.set(type,spriteFrames);
      });

        list.push(p);
        
      }
     
      await Promise.all(list);
    }
  

    update(dt){
      if(!this.shouleUpdate){
        return;
      }
      this.render();
      this.tick(dt);

    }

    tick(dt){
      this.tickActor(dt);
      DataManager.Instance.applyInput({
        type: InputTypeEnum.TimePast,
        dt,
      })
    }

    tickActor(dt){
      for (const data of DataManager.Instance.state.actors) {
        const{id} = data;
        let am = DataManager.Instance.actorMap.get(id);
        am.tick(dt);
    }
  }

    initMap(){
          const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Map);
          const map = instantiate(prefab);
          map.setParent(this.stage);
    }

    render() {
      this.renderActor();
      this.renderBullet();
    }

    renderActor(){
      for (const data of DataManager.Instance.state.actors) {
        const{id,type} = data;
        let am = DataManager.Instance.actorMap.get(id);
        if(!am){
          const prefab = DataManager.Instance.prefabMap.get(type);
          const actor = instantiate(prefab);
          actor.setParent(this.stage);
          am = actor.addComponent(ActorManager);
          DataManager.Instance.actorMap.set(id,am);
          am.init(data);
          am.render(data);
        }else{
          am.render(data);
        }
      }
    }

    renderBullet(){
      for (const data of DataManager.Instance.state.bullets) {
        const{id,type} = data;
        let bm = DataManager.Instance.bulletMap.get(id);
        if(!bm){
          
          const bullet = ObjectPoolManager.Instance.get(type);
         
          bm = bullet.getComponent(BulletManager) || bullet.addComponent(BulletManager);
          DataManager.Instance.bulletMap.set(id,bm);
          bm.init(data);
          bm.render(data);
        }else{
          bm.render(data);
        }
      }
    }

    

   

}


