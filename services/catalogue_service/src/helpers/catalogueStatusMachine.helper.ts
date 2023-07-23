import CatagoryStatusConfig from "../constants/categoryStatus.constants";
import createMachine from "../utils/catalogue.state.machine";

const CatalogueStatusMachine = createMachine(CatagoryStatusConfig);

export default CatalogueStatusMachine;