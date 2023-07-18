
type NoOp =()=>void;
const noop : NoOp=()=>{}

interface TransistionState<S extends Record<string,string>> {
    currentStateOnExit:NoOp,
    nextStateOnEnter:NoOp,
    statusAction:NoOp,
    state:S
}

interface StateMachine<S extends  Record<string,string>,A extends string>{
    state:keyof S,
    getInitialState:()=>keyof S,
    transistion:(currentState:S,actionType:A)=>TransistionState<S>
}

function createMachine<S extends Record<string,string>, A extends string>(stateConfig:StateMachineConfig<S,A>):StateMachine<S,A>{
    return {
        state: stateConfig.initialState,
        getInitialState :()=> stateConfig.initialState,
        transition:function <S extends Record<string,any>,A extends string>(currentState: keyof Record<string,any>, actionType:string):TransistionState<S>{
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


interface StateMachineConfig<S extends Record<string,string> , A extends string>{
    initialState:keyof S,
    [keyof in S]:{
        actions:{
            onEnter:NoOp,
            onExit:NoOp
        },
        transition:{
            [tkey in A]:{
                target:S,
                actions:NoOp
            }
        }
    }
}

