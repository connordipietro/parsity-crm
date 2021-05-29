import { useState, useEffect } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewDeal } from '../../actions'
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const dealSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for the deal"),
  owner: Yup.string(),
  amount: Yup.number().required("Please enter a deal amount"),
  company: Yup.string()
})

function AddDeal() {
  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(dealSchema),
  });

  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);
  useEffect(() => axios.get("/companies/list").then(({ data }) => setCompaniesList(data)), [setCompaniesList])

  const handleDealAdd = (data) => {
    debugger;
    dispatch(postNewDeal(data))
    reset()
    setShow(false);
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Amount']

  return (
    <div>
      <Button variant="primary" className="add-deals-button" onClick={() => setShow(true)}>
        Add Deal
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add a new Company</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleDealAdd)}>
          <Modal.Body>
            {formFields.map(field => {
              return (
                <div key ={field}>
                  <div className="form-group" >
                    <label>{field}</label>
                    <input
                      className="form-control"
                      placeholder={`Enter Company ${field}`}
                      name={field.toLowerCase()}
                      {...register(field.toLowerCase())}
                    ></input>
                    {errors[field.toLowerCase()]?.message}
                  </div>
                  <br />
                </div>
              )
            })}
            <div key ="company">
              <div className="form-group" >
                <label>Company</label>
                <select 
                  className="form-control"
                  name="company"
                  {...register("company")}
                  >
                  {companiesList.map(company => {
                    return (
                          <option key={company._id} value={company._id}>{company.name}</option>
                    );
                  })}
                </select>
              </div>
              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button type="submit" variant="primary">Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddDeal;