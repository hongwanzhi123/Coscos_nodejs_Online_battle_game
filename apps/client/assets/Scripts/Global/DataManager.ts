import { JoyStickManager } from "../../UI/JoyStickManager";
import Singleton from "../Base/Singleton";
import { IState } from "../Common";


export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  jm: JoyStickManager;

  state:IState = {
    actors:[
      {
        id:0,
        position:{
          x:0,
          y:0,
        },
        direction:{
          x:1,
          y:0,
        }
      }
    ]
  }


  applyInput(){
    
  }


}
