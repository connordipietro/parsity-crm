import axios from 'axios';
import * as actionNames from './action-names.js';

export function getCompanies(pageNumber) {
  return axios
    .get(`/companies?page=${pageNumber}`)
    .then((response) => ({
      type: actionNames.GET_COMPANIES,
      payload: response,
    }))
    .catch((error) => ({
      type: actionNames.GET_COMPANIES_ERROR,
      payload: error,
    }));
}

export function getCompaniesList() {
  const companyList = axios.get('/companies/list');
  return {
    type: actionNames.GET_COMPANIES_LIST,
    payload: companyList,
  };
}

export function getDeals() {
  return axios
    .get(`/deals/by-stage`)
    .then((response) => ({
      type: actionNames.GET_DEALS,
      payload: response,
    }))
    .catch((error) => ({
      type: actionNames.GET_DEALS_ERROR,
      payload: error,
    }));
}

// will need to pass in current page number, and then apply it the .then(() => getCompanies). Currently if on page 2, and no param passed to getCompanies after adding a new company, first 5 companies will be displayed and current page will not be maintained. May want to default to last page so the newly added company is displayed.
export function postNewCompany(newCompany) {
  return axios
    .post(`/companies`, newCompany)
    .then((response) => ({
      type: actionNames.POST_COMPANY,
      payload: response,
    }))
    .catch((error) => {
      alert('Error');
    });
}

export function resetNewCompany() {
  return {
    type: actionNames.RESET_NEW_COMPANY,
  };
}

export function postNewDeal(newDeal) {
  return axios
    .post(`/deals`, newDeal)
    .then((response) => ({
      type: actionNames.POST_DEAL,
      payload: response,
    }))
    .then(() => getDeals())
    .catch((error) => {
      alert('Error');
    });
}

export function putDeal(id, updatedStage) {
  const response = axios.put(`/deals/${id}`, { stage: updatedStage });
  return {
    type: actionNames.GET_DEALS,
    payload: response,
  };
}

export function editDeal(id, updatedDeal) {
  return axios
    .put(`/deals/${id}/update`, updatedDeal)
    .then(() => getDeals())
    .catch((error) => {
      alert('Error');
    });
}

export function getCompanyById(_id) {
  return axios
    .get(`/companies/${_id}`)
    .then((response) => ({
      type: actionNames.GET_COMPANY,
      payload: response,
    }))
    .catch((error) => ({
      type: actionNames.GET_COMPANY_ERROR,
      payload: error,
    }));
}

export function editCompany(updatedInfo, id) {
  return axios
    .put(`/companies/${id}`, updatedInfo)
    .then(() => getCompanyById(id))
    .catch((error) => {
      alert('Error');
    });
}

export function deleteCompany(id) {
  return axios
    .delete(`/companies/${id}`)
    .then(() => getCompanies())
    .catch((error) => {
      alert('Error');
    });
}

export function getCompaniesByRevenue() {
  return axios
    .get(`/dashboard/sales-by-company`)
    .then((response) => ({
      type: actionNames.GET_COMPANIES_BY_REVENUE,
      payload: response,
    }))
    .catch((error) => {
      alert('Error');
    });
}

export function getConversionPercentageOverall() {
  return axios
    .get(`/dashboard/conversion-percentage-overall`)
    .then((response) => ({
      type: actionNames.GET_CONVERSION_PERCENTAGE_ALL,
      payload: response,
    }))
    .catch((error) => {
      alert('Error');
    });
}

export function getConversionsByStage() {
  return axios
    .get(`/dashboard/conversion-percentage-by-stage`)
    .then((response) => ({
      type: actionNames.GET_CONVERSIONS_BY_STAGE,
      payload: response,
    }))
    .catch((error) => {
      alert('Error');
    });
}

export function getRevenueByMonth() {
  return axios
    .get(`/dashboard/sales-by-month`)
    .then((response) => ({
      type: actionNames.GET_REVENUE_BY_MONTH,
      payload: response,
    }))
    .catch((error) => {
      alert('Error');
    });
}
