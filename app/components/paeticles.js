'use client'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
 import React from "react";

class Particlesjs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false
    };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      this.setState({ init: true });
    });
  }

  particlesLoaded = (container) => {
    console.log(container);
  };

  render() {
    const { init } = this.state;
    const options = {
      fullScreen:false,
          background: {
            opacity:"0.8",
            color: {
              value: "fff",
            },
            image:'linear-gradient(to right top, #04fc04, #00ffae, #6efe6a, #00ffae, #a1ffa1)'
            
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 90,
                duration: 0.8,
              },
            },
          },
          particles: {
            color: {
              value: "#fff",
            },
            links: {
              color: "#fff",
              distance: 200,
              enable: true,
              opacity: 1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: true,
            },
            number: {
              density: {
                enable: true,
              },
              value: 100,
            },
            opacity: {
              value: 1,
            },
            shape: {
                type: "circle",
                
              },
            size: {
              value: { min: 5, max: 50},
            },
          },
          detectRetina: true,

        }
    
 
        if (init) {
            return (
                <div id="particlesdiv" className="-z-10 backdrop-blur-md h-full absolute top-0 left-0  w-full">
              <Particles
                id="tsparticles"
                particlesLoaded={this.particlesLoaded}
                options={options}
                className=" h-full"
              /></div>
            );
          }
      
          return null;
        }
      }

export default Particlesjs;