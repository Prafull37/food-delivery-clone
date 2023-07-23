import { StateMachineConfig,noop } from "../utils/catalogue.state.machine"

export enum CategoryStatus{
   DRAFT='DRAFT',
   REVIEW_IN_PROGRESS='REVIEW_IN_PROGRESS',
   REVIEW_COMPLETED='REVIEW_COMPLETED',
   DELETED='DELETED',
   PUBLISHED='PUBLISHED'
}

export enum CategoryActions{
    ON_COMPLETE='ON_COMPLETE',
    ON_REVIEW='ON_REVIEW',
    ON_START='ON_START',
    ON_DELETE='ON_DELETE',
    ON_PUBLISH='ON_PUBLISH',
}


const CatagoryStatusConfig:StateMachineConfig<CategoryStatus,CategoryActions>={
    initialState:CategoryStatus.DRAFT,
    [CategoryStatus.DRAFT]:{
        actions:{
            onEnter:noop,
            onExit:noop,
        },
        transition:{
            [CategoryActions.ON_REVIEW]:{
                target:CategoryStatus.REVIEW_IN_PROGRESS,
                action:noop,
            },
            [CategoryActions.ON_COMPLETE]:{
                target:CategoryStatus.REVIEW_COMPLETED,
                action:noop,
            },
        }
    },
    [CategoryStatus.REVIEW_IN_PROGRESS]:{
        actions:{
            onEnter:noop,
            onExit:noop,
        },
        transition:{
            [CategoryActions.ON_COMPLETE]:{
                target:CategoryStatus.REVIEW_COMPLETED,
                action:noop,
            },
            [CategoryActions.ON_DELETE]:{
                target:CategoryStatus.DELETED,
                action:noop,
            },
        }
    },
    [CategoryStatus.REVIEW_COMPLETED]:{
        actions:{
            onEnter:noop,
            onExit:noop,
        },
        transition:{
            [CategoryActions.ON_START]:{
                target:CategoryStatus.DRAFT,
                action:noop,
            },
            [CategoryActions.ON_PUBLISH]:{
                target:CategoryStatus.PUBLISHED,
                action:noop,
            },
        }
    },
    [CategoryStatus.PUBLISHED]:{
        actions:{
            onEnter:noop,
            onExit:noop,
        },
        transition:{
            [CategoryActions.ON_DELETE]:{
                target:CategoryStatus.REVIEW_IN_PROGRESS,
                action:noop,
            },
        }
    },
    [CategoryStatus.DELETED]:{
        actions:{
            onEnter:noop,
            onExit:noop,
        },
        transition:{}
    }
}

export default CatagoryStatusConfig;