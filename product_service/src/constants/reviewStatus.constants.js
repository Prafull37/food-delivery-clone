const ITEM_TO_REVIEW = 'ITEM_TO_REVIEW';
const REVIEW_STARTED = 'REVIEW_STARTED';
const REVIEW_IN_PROGRESS=  'REVIEW_IN_PROGRESS';
const REVIEW_COMPLETED = 'REVIEW_COMPLETED';
const REVIEW_REJECTED = 'REVIEW_REJECTED';


const ON_START_REVIEW = 'ON_START_REVIEW';
const ON_DRAFT = 'ON_DRAFT';
const ON_COMPLETE = 'ON_COMPLETE';
const ON_REJECT = 'ON_REJECT';
const ON_UPDATE = 'ON_UPDATE';

const REVIEW_STATUS={
    ITEM_TO_REVIEW,
    REVIEW_STARTED,
    REVIEW_IN_PROGRESS,
    REVIEW_COMPLETED,
    REVIEW_REJECTED
}


const REVIEW_ACTIONS ={
    ON_COMPLETE,
    ON_DRAFT,
    ON_REJECT,
    ON_UPDATE,
    ON_START_REVIEW
}

export  {REVIEW_STATUS,REVIEW_ACTIONS}