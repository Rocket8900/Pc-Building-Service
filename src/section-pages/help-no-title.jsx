import React from 'react';

const help = () => {
    return(
        <div className="container">
            <div className="row">

                <div className="col-lg-6">

                    <div className="accordion accordion-flush" id="accflush">

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c1" aria-expanded="false" aria-controls="flush-c1">
                            What is game hosting?
                          </button>
                        </h3>
                        <div id="flush-c1" className="accordion-collapse collapse" aria-labelledby="flush-h1" data-bs-parent="#accflush">
                          <div className="accordion-body">
                              <p>Game hosting refers to the process of renting or setting up servers to run multiplayer online games. These servers allow players to connect and play together in the same game world.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h2">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c2" aria-expanded="false" aria-controls="flush-c2">
                            Why do I need game hosting?
                          </button>
                        </h3>
                        <div id="flush-c2" className="accordion-collapse collapse" aria-labelledby="flush-h2" data-bs-parent="#accflush">
                          <div className="accordion-body">
                              <p>Game hosting is essential for multiplayer gaming. It provides a dedicated server where players can join, ensuring a smooth and lag-free gaming experience. It also allows you to customize game settings and mods.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h3">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c3" aria-expanded="false" aria-controls="flush-c3">
                            How do I choose a game hosting provider?
                          </button>
                        </h3>
                        <div id="flush-c3" className="accordion-collapse collapse" aria-labelledby="flush-h3" data-bs-parent="#accflush">
                          <div className="accordion-body">
                              <p>Consider factors like server location, performance, scalability, customer support, and price when choosing a game hosting provider. Read reviews and ask for recommendations from fellow gamers.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h4">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c4" aria-expanded="false" aria-controls="flush-c4">
                            What types of games can I host?
                          </button>
                        </h3>
                        <div id="flush-c4" className="accordion-collapse collapse" aria-labelledby="flush-h4" data-bs-parent="#accflush">
                          <div className="accordion-body">
                              <p>You can host various types of games, including first-person shooters, role-playing games, survival games, strategy games, and more. The type of game hosting you need depends on the game&apos;s requirements.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h5">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c5" aria-expanded="false" aria-controls="flush-c5">
                             What is server latency or ping?
                          </button>
                        </h3>
                        <div id="flush-c5" className="accordion-collapse collapse" aria-labelledby="flush-h5" data-bs-parent="#accflush">
                          <div className="accordion-body">
                               <p>Server latency or ping measures the time it takes for data to travel between your computer and the game server. Lower ping values indicate better responsiveness and less lag.</p>
                          </div>
                        </div>
                      </div>

                    </div>
                    
                </div>

                <div className="col-lg-6">
                    <div className="accordion accordion-flush" id="accflush1">

                        <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h1-1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c1-1" aria-expanded="false" aria-controls="flush-c1-1">
                            How do I manage a game server?
                          </button>
                        </h3>
                        <div id="flush-c1-1" className="accordion-collapse collapse" aria-labelledby="flush-h1-1" data-bs-parent="#accflush1">
                          <div className="accordion-body">
                             <p>Game server management varies depending on the hosting provider and game type. Typically, you&apos;ll have access to a control panel or command-line interface to configure settings, mods, and player access.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h2-1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c2-1" aria-expanded="false" aria-controls="flush-c2-1">
                            Can I run mods on my game server?
                          </button>
                        </h3>
                        <div id="flush-c2-1" className="accordion-collapse collapse" aria-labelledby="flush-h2-1" data-bs-parent="#accflush1">
                          <div className="accordion-body">
                              <p>Yes, many game hosting providers support mods. You can install and manage mods to enhance gameplay or customize the game to your liking.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h3-1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c3-1" aria-expanded="false" aria-controls="flush-c3-1">
                            What is DDoS protection, and do I need it?
                          </button>
                        </h3>
                        <div id="flush-c3-1" className="accordion-collapse collapse" aria-labelledby="flush-h3-1" data-bs-parent="#accflush1">
                          <div className="accordion-body">
                             <p>DDoS (Distributed Denial of Service) protection helps defend your game server from malicious attacks that could disrupt gameplay. It&apos;s essential for maintaining server stability, especially for popular games.</p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h4-1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c4-1" aria-expanded="false" aria-controls="flush-c4-1">
                            How much does game hosting cost?
                          </button>
                        </h3>
                        <div id="flush-c4-1" className="accordion-collapse collapse" aria-labelledby="flush-h4-1" data-bs-parent="#accflush1">
                          <div className="accordion-body">
                                <p>Game hosting costs vary depending on the provider, server type, and game. Prices can range from a few dollars per month for small servers to hundreds for high-performance dedicated servers.</p>
                            </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h3 className="accordion-header" id="flush-h5-1">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c5-1" aria-expanded="false" aria-controls="flush-c5-1">
                            Is there 24/7 customer support?
                          </button>
                        </h3>
                        <div id="flush-c5-1" className="accordion-collapse collapse" aria-labelledby="flush-h5-1" data-bs-parent="#accflush1">
                          <div className="accordion-body">
                                <p>Many reputable game hosting providers offer 24/7 customer support to assist with technical issues and server management.</p>
                            </div>
                        </div>
                      </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default help;