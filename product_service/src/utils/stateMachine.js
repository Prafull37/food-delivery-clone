/**
 * 
 *STATUS_STATE_CONFIG={
    initialState:REVIEW_STATUS.ITEM_TO_REVIEW,
    [REVIEW_STATUS.ITEM_TO_REVIEW]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [REVIEW_ACTIONS.ON_START_REVIEW]:{
                target:REVIEW_STATUS.REVIEW_STARTED,
                actions:()=>{}
            }
        }
    },
 */

import { noop } from "./function.utils.js";


function createMachine(stateConfig){
    return {
        state: stateConfig.initialState,
        getInitialState :()=> stateConfig.initialState,
        transition:(currentState, actionType)=>{
            const currentStateObject = stateConfig[currentState];
            if(!!currentStateObject) return;

            const currentStateOnExit = currentStateObject.actions.onExit || noop;
            const currentStateTransition = currentStateObject.transition[actionType];
            if(!!currentStateTransition) return;

            const target = currentStateTransition.target;
            const statusAction = currentStateTransition.action || noop;
            const nextTargetObject = stateConfig[target];
            if(!!nextTargetObject) return;
            const nextStateOnEnter = nextTargetObject.action.onEnter || noop

            this.state = state;

            return {
                currentStateOnExit,
                nextStateOnEnter,
                statusAction,
                state
            }
        }
    }
}

export default createMachine;