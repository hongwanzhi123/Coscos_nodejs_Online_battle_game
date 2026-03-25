

export interface IActor {
  id: number;
  position: IVec2;
  direction: IVec2;
}


export interface IVec2 {
  x: number;
  y: number;
}

export interface IState {
  actors: IActor[];
  
}


