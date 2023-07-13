import {ITEM_STATE,ITEM_STATE_ACTIONS} from "../../constants/itemState.constants.js";



const ITEM_STATE_CONFIG={
    initialState:ITEM_STATE.NEW,
    [ITEM_STATE.NEW]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [ITEM_STATE_ACTIONS.ON_PUBLISH]:{
                target:ITEM_STATE.PUBLISHED,
                actions:()=>{}
            }
        }
    },
    [ITEM_STATE.PUBLISHED]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [ITEM_STATE_ACTIONS.ON_DEACTIVATE]:{
                target:ITEM_STATE.DEACTIVATE,
                actions:()=>{}
            },
            [ITEM_STATE_ACTIONS.ON_DELETE]:{
                target:ITEM_STATE.DELETED,
                actions:()=>{}
            },
        }
    },
    [ITEM_STATE.DEACTIVATE]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [ITEM_STATE_ACTIONS.ON_DELETE]:{
                target:ITEM_STATE.DELETED,
                actions:()=>{}
            },
            [ITEM_STATE_ACTIONS.ON_PUBLISH]:{
                target:ITEM_STATE.NEW,
                actions:()=>{}
            }
        }
    },
    [ITEM_STATE.DELETED]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [ITEM_STATE_ACTIONS.ON_PERMNANETLY_DELETE]:{
                target:ITEM_STATE.PERMANENTLY_DELETED,
                actions:()=>{}
            },
        }
    },
    [ITEM_STATE.PERMANENTLY_DELETED]:{
        actions:{
            onEnter:()=>{},
        },
    },
    
}


export default ITEM_STATE_CONFIG;