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
            image: " linear-gradient(to right top, #66deff, #58d4ff, #4fcaff, #4dbfff, #53b4ff)",
            opacity:"0.2",
            color: {
              value: "",
            },
          },
          fpsLimit: 90,
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
              value: "#003E4F",
            },
            links: {
              color: "#003E4F",
              distance: 200,
              enable: true,
              opacity: 0.5,
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
              value: 150,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
                type: "circle",
                
              },
            size: {
              value: { min: 5, max: 10},
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