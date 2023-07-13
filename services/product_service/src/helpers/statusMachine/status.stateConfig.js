import {REVIEW_STATUS,REVIEW_ACTIONS} from "../../constants/reviewStatus.constants.js";



const STATUS_STATE_CONFIG={
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
    [REVIEW_STATUS.REVIEW_STARTED]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [REVIEW_ACTIONS.ON_DRAFT]:{
                target:REVIEW_STATUS.REVIEW_IN_PROGRESS,
                actions:()=>{}
            },
            [REVIEW_ACTIONS.ON_COMPLETE]:{
                target:REVIEW_STATUS.REVIEW_COMPLETED,
                actions:()=>{}
            },
            [REVIEW_ACTIONS.ON_REJECT]:{
                target:REVIEW_STATUS.REVIEW_REJECTED,
                actions:()=>{}
            }
        }
    },
    [REVIEW_STATUS.REVIEW_IN_PROGRESS]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [REVIEW_ACTIONS.ON_COMPLETE]:{
                target:REVIEW_STATUS.REVIEW_COMPLETED,
                actions:()=>{}
            },
            [REVIEW_ACTIONS.ON_REJECT]:{
                target:REVIEW_STATUS.REJECTED,
                actions:()=>{}
            }
        }
    },
    [REVIEW_STATUS.REVIEW_COMPLETED]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [REVIEW_ACTIONS.ON_UPDATE]:{
                target:REVIEW_STATUS.ITEM_TO_REVIEW,
                actions:()=>{}
            },
        }
    },
    [REVIEW_STATUS.REVIEW_REJECTED]:{
        actions:{
            onEnter:()=>{},
            onExit:()=>{}
        },
        transition:{
            [REVIEW_ACTIONS.ON_UPDATE]:{
                target:REVIEW_STATUS.ITEM_TO_REVIEW,
                actions:()=>{}
            },
        }
    },
    
}


export default STATUS_STATE_CONFIG;