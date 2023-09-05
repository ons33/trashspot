import React from "react";
import doc from '../../../../assets/img/doc.png';
import docc from '../../../../assets/img/ii.jpg';


export default function UserFooter() {
    return (
        <section
          style={{
            backgroundImage: `url(${doc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            marginTop: "-19%",
          }}
        >
          <div className="containerrr mx-auto px-4 pb-32 pt-48">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
                <div className="md:pr-12" style={{ marginTop: "40%" }}>
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i class="fas fa-exclamation-triangle text-xl text-yellow-500"></i>                  </div>
                  <h3 className="text-3xl font-semibold text-white">
                    Food waste in Tunisia
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-white">
                    According to official figures dating back to 2020, nearly
                    572 million dinars worth of food products are wasted each
                    year by Tunisian households.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                        </div>
                        <div>
                          <h4 className="mt-4 text-lg leading-relaxed text-white">
                            You , me and everyone who wants it, we are capable of
                            reducing this number!
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-xl"
                  style={{
                    marginTop:"210px",
                    marginLeft:"40px",
                    transform:
                      "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                  }}
                  src={docc}
                />
              </div>
            </div>
          </div>

       

        </section>
    )
}