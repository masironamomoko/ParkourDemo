import { _decorator, Component, Node, RigidBody, Vec3, input, EventKeyboard, Input, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property(RigidBody)
    rigidbody:RigidBody

   /* @property(Number)
    speed:number;//移动速度*/

    @property(Number)
    forwardForce:number = 0;

    @property(Number)
    sideForce:number = 0;

    isLeftDown:boolean = false;

    isRightDown:boolean = false;

    start() {
        //console.log('start');
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);
    }

    update(deltaTime: number) {
        //console.log(deltaTime);
        let force = new Vec3(0,0,this.forwardForce * deltaTime);
        this.rigidbody.applyForce(force);
        if(this.isLeftDown){
            let leftForce = new Vec3(this.sideForce*deltaTime,0,0);
            this.rigidbody.applyForce(leftForce);
        }

        if(this.isRightDown){
            let rightForce = new Vec3(-this.sideForce*deltaTime,0,0);
            this.rigidbody.applyForce(rightForce);
        }
    }

    onDestory(){
        input.off(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.off(Input.EventType.KEY_UP,this.onKeyUp,this);
    }

    onKeyDown(event:EventKeyboard){
        if(event.keyCode == KeyCode.KEY_A){
            this.isLeftDown =true;
            console.log('key down A');
        }
        
        if(event.keyCode == KeyCode.KEY_D){
            this.isRightDown = true;
            console.log('key down D');
        }
    }

    onKeyUp(event:EventKeyboard){
        if(event.keyCode == KeyCode.KEY_A){
            this.isLeftDown =false;
            console.log('key up A');
        }
        
        if(event.keyCode == KeyCode.KEY_D){
            this.isRightDown = false;
            console.log('key up D');
        }
    }
}


