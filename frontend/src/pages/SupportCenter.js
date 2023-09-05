import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/ReusableComponents/components/Navbars/UserNavbar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
function SupportCenter({ user1 }) {
  console.log('hedha user **********', user1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  //console.log("-->"+user1?.email)
  const [formData, setFormData] = useState({
    email: user1?.email,
    subject: '',
    description: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: user1?.email }));
  }, [user1]);

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/support/addReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setFinished(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />

      <section className="relative block py-24  bg-green-800	">
        <div className="container my-6 px-4 ">
          <div className="">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-50		">
              <div className="flex-auto p-5 lg:p-10">
                {!finished ? (
                  <>
                    <h4 className="text-2xl font-semibold ">
                      {t('feel free to report  us any bugs or  Reports!')}
                    </h4>
                    <br></br>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      {t(
                        'Complete this form and we will get back to you in 24hours'
                      )}
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          {t('email')}
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={user1?.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="subject"
                        >
                          {t('Subject')}
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Subject"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="description"
                        >
                          {t('Message')}
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows="4"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white w-100"
                          placeholder="Type a message..."
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleSubmit}
                        >
                          {t('Send Message')}
                        </button>
                      </div>
                    </form>{' '}
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: '#24b765',
                        fontSize: '3em',
                        marginBottom: '20px',
                      }}
                    ></i>
                    <h2
                      className="text-xxl"
                      style={{ marginTop: '0', marginBottom: '20px' }}
                    >
                      {t('Thank you for submitting!')}
                    </h2>
                    <p style={{ fontSize: '1.2em' }}>
                      {t('Your feedback has been received')}.
                    </p>
                    <div className="text-center mt-6">
                      <button
                        className="bg-green-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          navigate('/');
                        }}
                      >
                        {t('Go back')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SupportCenter;
