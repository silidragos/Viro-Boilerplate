'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroMaterials,
    ViroAnimations,
    ViroAmbientLight,
    ViroOmniLight,
    ViroNode,
    Viro3DObject,
    ViroParticleEmitter,
    ViroSound
} from 'react-viro';

let bat3DModel = require('./assets/bat-scene/bat.vrx');
let batTexture = require('./assets/bat-scene/Bat_Color.jpg');
let particleSprite = require('./assets/bat-scene/particle_firework.png');
let swooshSound = require('./assets/bat-scene/Arrow+Swoosh+1.mp3');

export default class ARBatScene extends Component {
    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: 'Initializing',
            area: -2,
            showFireworks: false
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._onBatClick = this._onBatClick.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
    }

    setupLights() {
        return (
            <ViroNode>
                <ViroAmbientLight color="#FFFFFF" />
                <ViroOmniLight
                    intensity={300}
                    position={[-10, 10, -10]}
                    color={'#FFFFFF'}
                    attenuationStartDistance={0}
                    attenuationEndDistance={20}
                />
                <ViroOmniLight
                    intensity={300}
                    position={[-10, 10, 10]}
                    color={'#FFFFFF'}
                    attenuationStartDistance={0}
                    attenuationEndDistance={20}
                />
                <ViroOmniLight
                    intensity={300}
                    position={[10, 10, -10]}
                    color={'#FFFFFF'}
                    attenuationStartDistance={0}
                    attenuationEndDistance={20}
                />
                <ViroOmniLight
                    intensity={300}
                    position={[10, 10, 10]}
                    color={'#FFFFFF'}
                    attenuationStartDistance={0}
                    attenuationEndDistance={20}
                />
            </ViroNode>
        );
    }

    render() {
        return (
            <ViroARScene onTrackingUpdated={this._onInitialized}>
                {this.setupLights()}

                <ViroNode
                    animation={{
                        name: 'combinedBatAnimation',
                        run: true,
                        loop: true,
                        delay: 0
                    }}
                >
                    <ViroText
                        text={this.state.text}
                        scale={[0.5, 0.5, 0.5]}
                        position={[0, 0, this.state.area]}
                        style={styles.helloWorldTextStyle}
                        onClick={this._onBatClick}
                    />
                    <Viro3DObject
                        source={bat3DModel}
                        resources={[batTexture]}
                        type="VRX"
                        position={[0, -1, this.state.area]}
                        rotation={[0, -90, 0]}
                        scale={[0.1, 0.1, 0.1]}
                        onLoadEnd={this._onLoadEnd}
                        materials="defaultBlinn"
                        animation={{
                            name: 'Take 001',
                            run: true,
                            loop: true,
                            delay: 0
                        }}
                    />

                    {this.state.showFireworks && (
                        <ViroNode>
                            <ViroParticleEmitter
                                position={[0, 0, this.state.area]}
                                duration={1200}
                                delay={0}
                                visible={true}
                                run={true}
                                loop={true}
                                fixedToEmitter={true}
                                image={{
                                    source: particleSprite,
                                    height: 0.03,
                                    width: 0.03,
                                    bloomThreshold: 1
                                }}
                                spawnBehavior={{
                                    particleLifeTime: [1200, 1200],
                                    emissionRatePerSecond: [0, 0],
                                    emissionBurst: [{ time: 0, min: 300, max: 300, cycles: 1 }],
                                    spawnVolume: { shape: 'sphere', params: [0.15], spawnOnSurface: true },
                                    maxParticles: 1000
                                }}
                                particleAppearance={{
                                    opacity: {
                                        initialRange: [1.0, 1.0],
                                        factor: 'time',
                                        interpolation: [{ endValue: 0.0, interval: [800, 1200] }]
                                    },
                                    color: {
                                        initialRange: ['#ff2d2d', '#42ff42'],
                                        factor: 'time',
                                        interpolation: [{ endValue: '#42ff42', interval: [300, 1200] }]
                                    }
                                }}
                                particlePhyisics={{
                                    explosiveImpulse: {
                                        impulse: 0.12 * 1.0,
                                        position: [0, 0, 0],
                                        decelerationPeriod: 1.0
                                    }
                                }}
                            />
                            <ViroSound source={swooshSound} paused={false} muted={false} loop={false} volume={1.0} />
                        </ViroNode>
                    )}
                </ViroNode>
            </ViroARScene>
        );
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: 'Alive'
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }

    _onBatClick() {
        this.setState({
            text: 'Dead',
            showFireworks: true
        });

        setTimeout(() => {
            this.setState({
                showFireworks: false
            });
        }, 1200);
    }

    _onLoadEnd() {
        this.setState({
            text: 'Alive'
        });
    }
}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});

ViroMaterials.createMaterials({
    defaultBlinn: {
        lightingModel: 'Blinn'
    }
});

ViroAnimations.registerAnimations({
    loopRotate: {
        properties: {
            rotateY: '+=90'
        },
        duration: 10000
    },
    goUp: {
        properties: {
            positionY: '+= 0.2'
        },
        duration: 3000
    },
    goDown: {
        properties: {
            positionY: '+= -0.2'
        },
        duration: 3000
    },
    combinedBatAnimation: [['loopRotate'], ['goUp', 'goDown']]
});

module.exports = ARBatScene;
