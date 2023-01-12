import React, {useEffect, useRef} from 'react';
import Player from "./game/player";
import InputHandler from './game/input';
import {Background} from "../secret/game/background";
import {ClimbingEnemy, FlyingEnemy, CandyPointEnemy, GolemEnemy, YetiEnemy} from "../secret/game/enemies";
import { UI } from './game/UI';



const useGame = (draw) => {
    const canvasRef = useRef(null)
    const CANVAS_WIDTH = 1500
    const CANVAS_HEIGHT = 720


    let ctx
    let animationFrameId

    let score = 0
    let gameOver = false



    class Game {
        private width: any;
        private height: any;
        private player: Player;
        private input: InputHandler;
        private groundMargin: number;
        private speed: number;
        private maxSpeed: number;
        private enemies: any;
        background: Background;
        private enemyTimer: number;
        private enemyInterval: number;
        private debugMode: boolean;
        private fontColor: string;
        private UI: UI;
        private particles: any[];
        private maxParticles: number;
        private collisions: any[];
        private floatingMessages: any[];
        private lives: number;
        public gameOver: boolean;
        private candy: number;
        private time: number;
        private maxTime: number;
        private candyCurrent: number;
        private killedEnemies: number;
        private ultimateTimer: number;
        private ultimateDuration: number;
        constructor(width, height, restartGame, gameOver) {
            this.width = width
            this.height = height
            this.speed = 0
            this.maxSpeed = 10
            this.groundMargin = 80
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this, restartGame, gameOver)
            this.UI = new UI(this)
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.floatingMessages = []
            this.maxParticles = 300
            this.enemyTimer = 0
            this.enemyInterval = 2000
            this.debugMode = false
            this.time = 30000
            this.lives = 5
            this.candy = 10
            this.killedEnemies = 0
            this.candyCurrent = 0
            this.ultimateTimer = 0
            this.ultimateDuration = 9000
            this.gameOver = false
            this.fontColor = 'black'
        }
        update(deltaTme) {
            if(this.time <= 0) {
                this.gameOver = true
                this.time = 0
            } else this.time -= deltaTme
            this.background.update()
            this.UI.update()
            this.player.update(this.input.keys, deltaTme)
            //add enemies
            if(this.enemyTimer > this.enemyInterval) {
                if(!this.gameOver) this.addEnemy()
                this.enemyTimer = 0
            } else this.enemyTimer += deltaTme
            this.enemies.forEach(enemy => enemy.update(deltaTme))
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            //handle messages
            this.floatingMessages.forEach(message => message.update(deltaTme))
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)
            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update()
                if(particle.markedForDeletion) this.particles.splice(index,1)
            })
            if(this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles
            }
            //handle collisions
            this.collisions.forEach(collision => collision.update(deltaTme))
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
            //manage player ultimate
            if(this.killedEnemies >= 9) {
               this.ultimateTimer += deltaTme
            }
        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => enemy.draw(context))
            this.collisions.forEach(collision => collision.draw(context))
            this.UI.draw(context)
            this.particles.forEach(particle => particle.draw(context))
            this.floatingMessages.forEach(message => message.draw(context))
        }
        restart() {
            this.player.x = 100
            this.player.y = this.height - this.player.height
            this.player.maxFrame = 6
            this.player.frameY = 0
            this.time = 30000
            this.lives = 5
            this.killedEnemies = 0
            this.candyCurrent = 0
            this.ultimateTimer = 0
            this.gameOver = false
        }
        addEnemy() {
            const appearanceFrequency = (frequency: string): boolean => {
                return Math.random() < (
                    frequency === '30%'
                        ? this.ultimateTimer === 0 ? 0.3 : 0.2 //уменьшил шанс появления конфет во время ульты игрока
                        : frequency === '50%'
                            ? 0.5
                            : 0.8)
            }
            if(this.speed > 0) {
                if (appearanceFrequency('30%')) this.enemies.push(new CandyPointEnemy(this))
                else {
                    if(appearanceFrequency('80%')) this.enemies.push(appearanceFrequency('50%') ? new GolemEnemy(this) : new YetiEnemy(this))
                    else {
                        this.enemies.push(appearanceFrequency('50%') ? new GolemEnemy(this) : new YetiEnemy(this))
                        this.enemies.push(new FlyingEnemy(this))
                    }
                }
            }
            if(appearanceFrequency(this.ultimateTimer === 0 ? '30%' : '50%')) {
                setTimeout(() => {
                    this.enemies.push(
                        appearanceFrequency('30%')
                            ? new FlyingEnemy(this)
                            : appearanceFrequency('50%')
                                ? new GolemEnemy(this)
                                : new YetiEnemy(this))
                }, 500)
            }
            if(this.ultimateTimer > 0 && this.ultimateTimer < 7000) {
                setTimeout(() => {
                    if(appearanceFrequency('30%')) this.enemies.push(
                        appearanceFrequency('50%')
                            ? new GolemEnemy(this)
                            : new YetiEnemy(this))
                    else this.enemies.push(new FlyingEnemy(this))
                }, 800)
            }
        }
    }


    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        ctx = canvas.getContext('2d')
        ctx.font = "40px Rubik Gemstones"


        const fullScreenButton = document.getElementById('fullScreenButton')

        let lastTime = 0
        Audio.prototype.stop = function() {
            this.pause();
            this.currentTime = 0;
        };


        const game = new Game(canvas.width, canvas.height, restartGame, gameOver)

        function restartGame() {
            game.restart()
            game.background.restart()
        }

        function  toggleFullScreen() {
            if(!document.fullscreenElement) {
                canvas.requestFullscreen().catch(err => {
                    alert(`Error, can't enable fullscreen mode: ${err.message}`)
                })
            } else {
                document.exitFullscreen()
            }
        }
        fullScreenButton.addEventListener('click', toggleFullScreen)

        //Отрисовка
        const render = (timestamp) => {
            const deltaTme = timestamp - lastTime
            lastTime = timestamp
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            game.draw(ctx)
            game.update(deltaTme)


           // if(!game.gameOver) animationFrameId = window.requestAnimationFrame(render)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render(0)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
};

export default useGame;