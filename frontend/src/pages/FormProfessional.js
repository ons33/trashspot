import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import './Formulaire.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FormProfessional() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const getUser = useCallback(async () => {
    const { data } = await axios.get(`https://he-bosses-pi-dev-api.onrender.com/api/getUser/${id}`);
    setData(data);
    console.log(data);
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate firstName
    const newErrors = {};
    if (!data.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (data.firstName.length < 3) {
      newErrors.firstName = 'First Name must be at least 3 characters long';
    }

    if (!data.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (data.lastName.length < 3) {
      newErrors.lastName = 'Last Name must be at least 3 characters long';
    }

    if (!/^\d{5}(?:[-\s]\d{4})?$/.test(data.postalCode)) {
      newErrors.postalCode = 'Invalid postal code';
    }

    if (!data.organisationName) {
      newErrors.organisationName = 'Name of the grocery store is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(errors);
      UpdateUser();
      navigate('/');
    }
  };
  const UpdateUser = async () => {
    const response = await axios.put(
      `https://he-bosses-pi-dev-api.onrender.com/api/updateUser/${id}`,
      data
    );
    console.log(response.data);
  };

  return (
    <form className="jotform-form" onSubmit={handleSubmit}>
      <div role="main" className="form-all">
        <ul
          className="form-section page-section"
          style={{ backgroundColor: '#69b550' }}
        >
          <li id="cid_1" className="form-input-wide" data-type="control_head">
            <div className="form-header-group header-large">
              <div className="header-text httal htvam">
                <h1
                  id="header_1"
                  className="form-header"
                  data-component="header"
                >
                  Registration Form
                </h1>
                <br />
                <div id="subHeader_1" className="form-subHeader">
                  Fill out the form carefully for registration
                </div>
              </div>
            </div>
          </li>
          <li className="form-line" data-type="control_fullname" id="id_4">
            <label
              className="form-label form-label-top form-label-extended form-label-auto"
              id="label_4"
              for="first_4"
            >
              Name
            </label>
            <div id="cid_4" className="form-input-wide" data-layout="full">
              <div data-wrapper-react="true" className="extended">
                <span
                  className="form-sub-label-container"
                  style={{ verticalAlign: 'top' }}
                  data-input-type="first"
                >
                  <input
                    type="text"
                    id="last_4"
                    name="firstName"
                    className="form-textbox"
                    size="15"
                    value={data.firstName || ''}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                  {errors.firstName && (
                    <span style={{ color: 'red' }}>{errors.firstName}</span>
                  )}
                  <label
                    className="form-sub-label"
                    for="first_4"
                    id="sublabel_4_first"
                    style={{ minHeight: '13px' }}
                    aria-hidden="false"
                  >
                    First Name
                  </label>{' '}
                </span>
                <span
                  className="form-sub-label-container"
                  style={{ verticalAlign: 'top' }}
                  data-input-type="last"
                >
                  <input
                    type="text"
                    id="last_4"
                    name="lastName"
                    className="form-textbox"
                    size="15"
                    value={data.lastName || ''}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                  />
                  {errors.lastName && (
                    <span style={{ color: 'red' }}>{errors.lastName}</span>
                  )}
                  <label
                    className="form-sub-label"
                    for="last_4"
                    id="sublabel_4_last"
                    style={{ minHeight: '13px' }}
                    aria-hidden="false"
                  >
                    Last Name
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li className="form-line form-line-column form-col-1" id="id_6">
            <label
              className="form-label form-label-top"
              id="label_6"
              for="input_6"
            >
              Name of the Association
            </label>
            <div id="cid_6" className="form-input-wide" data-layout="half">
              <span
                className="form-sub-label-container"
                style={{ verticalAlign: 'top' }}
              >
                <input
                  type="text"
                  id="last_4"
                  name="organisationName"
                  className="form-textbox"
                  style={{ width: '310px' }}
                  value={data.organisationName || ''}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      organisationName: e.target.value,
                    }))
                  }
                />
                {errors.organisationName && (
                  <span style={{ color: 'red' }}>
                    {errors.organisationName}
                  </span>
                )}
              </span>
            </div>
          </li>
          <li className="form-line" data-type="control_address" id="id_23">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_23"
              for="input_23_addr_line1"
            >
              Address
            </label>
            <div id="cid_23" className="form-input-wide" data-layout="full">
              <div
                summary=""
                className="form-address-table jsTest-addressField"
              >
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-street-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: 'top' }}
                    >
                      <input
                        type="text"
                        id="input_23_addr_line1"
                        name="address"
                        className="form-textbox form-address-line"
                        size="30"
                        value={data.street || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            street: e.target.value,
                          }))
                        }
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_addr_line1"
                        id="sublabel_23_addr_line1"
                        style={{ minHeight: '13px' }}
                        aria-hidden="false"
                      >
                        Street Address
                      </label>
                    </span>
                  </span>
                </div>
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-city-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: 'top' }}
                    >
                      <input
                        type="text"
                        id="input_23_city"
                        name="city"
                        className="form-textbox form-address-city"
                        value={data.city || ''}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, city: e.target.value }))
                        }
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_city"
                        id="sublabel_23_city"
                        style={{ minHeight: '13px' }}
                        aria-hidden="false"
                      >
                        City
                      </label>
                    </span>
                  </span>
                  <span className="form-address-line form-address-state-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: 'top' }}
                    >
                      <input
                        type="text"
                        id="input_23_state"
                        name="state"
                        className="form-textbox form-address-state"
                        value={data.state || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_state"
                        id="sublabel_23_state"
                        style={{ minHeight: '13px' }}
                        aria-hidden="false"
                      >
                        State / Province
                      </label>
                    </span>
                  </span>
                </div>
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-zip-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: 'top' }}
                    >
                      <input
                        type="text"
                        id="input_23_postal"
                        name="postal"
                        className="form-textbox form-address-postal"
                        value={data.postalCode || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            postalCode: e.target.value,
                          }))
                        }
                      />
                      {errors.postalCode && (
                        <span style={{ color: 'red' }}>
                          {errors.postalCode}
                        </span>
                      )}
                      <label
                        className="form-sub-label"
                        for="input_23_postal"
                        id="sublabel_23_postal"
                        style={{ minHeight: '13px' }}
                        aria-hidden="false"
                      >
                        Postal / Zip Code
                      </label>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-1"
            data-type="control_email"
            id="id_6"
          >
            <label
              className="form-label form-label-top"
              id="label_6"
              for="input_6"
            >
              E-mail
            </label>
            <div id="cid_6" className="form-input-wide" data-layout="half">
              <span
                className="form-sub-label-container"
                style={{ verticalAlign: 'top' }}
              >
                <input
                  type="email"
                  id="input_6"
                  name="email"
                  className="form-textbox validate[Email]"
                  style={{ width: '310px' }}
                  size="310"
                  placeholder="ex: myname@example.com"
                  value={data.email || ''}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <label
                  className="form-sub-label"
                  for="input_6"
                  id="sublabel_input_6"
                  style={{ minHeight: '13px' }}
                  aria-hidden="false"
                >
                  example@example.com
                </label>
              </span>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-2"
            data-type="control_phone"
            id="id_27"
          >
            <label
              className="form-label form-label-top"
              id="label_27"
              for="input_27_full"
            >
              Mobile Number
            </label>
            <div id="cid_27" className="form-input-wide" data-layout="half">
              <span
                className="form-sub-label-container"
                style={{ verticalAlign: 'top' }}
              >
                <input
                  type="tel"
                  id="input_27_full"
                  name="phone"
                  className="mask-phone-number form-textbox validate[Fill Mask]"
                  style={{ width: '310px' }}
                  placeholder="(000) 00-000-000"
                  value={data.phoneNumber || ''}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </span>
            </div>
          </li>
          <li className="form-line" data-type="control_textarea" id="id_45">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_45"
              for="input_45"
            >
              Bio
            </label>
            <div id="cid_45" className="form-input-wide" data-layout="full">
              <textarea
                id="input_45"
                className="form-textarea"
                name="bio"
                style={{ width: '648px', height: '163px' }}
                value={data.bio || ''}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, bio: e.target.value }))
                }
              ></textarea>
            </div>
          </li>
          <li className="form-line" data-type="control_button" id="id_48">
            <div id="cid_48" className="form-input-wide" data-layout="full">
              <div
                data-align="auto"
                className="form-buttons-wrapper form-buttons-auto jsTest-button-wrapperField"
              >
                <button
                  id="input_48"
                  type="submit"
                  className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                >
                  Submit
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </form>
  );
}

export default FormProfessional;
