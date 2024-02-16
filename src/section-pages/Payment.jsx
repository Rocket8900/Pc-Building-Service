import React from 'react';

const Payment = () => {
    return(
       <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Payment Methods</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">We accept</h2>
                        </div>
                        <div className="col-lg-6">
                            <div className="row g-4">
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/visa.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/mastercard.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/paypal.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/skrill.webp"className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/jcb.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-4">
                                    <div className="p-2 rounded-10 bg-half-white">
                                        <img width="70" height="50" src="./img/payments/american-express.webp" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Payment;