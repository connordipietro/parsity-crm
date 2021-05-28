import { combineReducers } from "redux";
import CompaniesReducer from "./companies-reducer";
import DealsReducer from "./deals-reducer";
import NewCompanyReducer from "./new-company-reducer";
import CompanyReducer from "./company-reducer";
import NewDealReducer from "./new-deal-reducer"

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  companiesServerError: CompaniesReducer,
  dealsData: DealsReducer,
  dealsServerError: DealsReducer,
  newCompany: NewCompanyReducer,
  companyView: CompanyReducer,
  companyServerError: CompanyReducer,
  newDeal: NewDealReducer
});

export default rootReducer;