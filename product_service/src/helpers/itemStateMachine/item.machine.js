import createMachine from '../../utils/stateMachine.js';
import ITEM_STATE_CONFIG from './item.stateConfig.js';

const itemStateMachine = createMachine(ITEM_STATE_CONFIG);


export default itemStateMachine;