import createMachine from '../../utils/stateMachine.js';
import STATUS_STATE_CONFIG from './status.stateConfig.js';

const statusMachine = createMachine(STATUS_STATE_CONFIG);


export default statusMachine;