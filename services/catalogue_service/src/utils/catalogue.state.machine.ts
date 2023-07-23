
type NoOp =()=>void;
export const noop : NoOp=()=>{}

interface TransistionState<S extends string> {
    currentStateOnExit:NoOp,
    nextStateOnEnter:NoOp,
    statusAction:NoOp,
    state:S
}

export interface StateMachine<S extends  string,A extends string>{
    state:S,
    getInitialState:()=>S,
    transition:(currentState:S,actionType:A)=>TransistionState<S>|undefined
}

export interface StateMachineConfig<S extends string , A extends string>{
    initialState:S,
    [key :string]:{
        actions:{
            onEnter:NoOp,
            onExit:NoOp
        },
        transition:{
            [key:string]:{
                target:S,
                action:NoOp
            }
        }
    }
}

function createMachine<S extends string, A extends string>(stateConfig:StateMachineConfig<S,A>):StateMachine<S,A>{
    return {
        state: stateConfig.initialState,
        getInitialState :()=> stateConfig.initialState,
        transition:function <S extends string,A extends string>(currentState: S, actionType:A):TransistionState<S>|undefined{
            const currentStateObject = stateConfig[currentState];
            if(!currentStateObject) return;

            const currentStateOnExit = currentStateObject.actions.onExit || noop;
            const currentStateTransition = currentStateObject.transition[actionType];
            if(!currentStateTransition) return;

            const target = currentStateTransition.target;
            const statusAction = currentStateTransition.action || noop;
            const nextTargetObject = stateConfig[target];
            if(!nextTargetObject) return;
            const nextStateOnEnter = nextTargetObject.actions.onEnter || noop

            this.state = target;

            return {
                currentStateOnExit,
                nextStateOnEnter,
                statusAction,
                state:target
            }
        }
    }
}

export default createMachine;




