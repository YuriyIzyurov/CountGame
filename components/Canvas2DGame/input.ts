export default class InputHandler {
    keys: any[];
    private touchY: number;
    private readonly touchTreshold: number;
    lastKey: string;
    private game: any;

    constructor(game, restartGame: () => void) {
        this.keys = []
        this.touchY = null
        this.touchTreshold = 30
        this.game = game
        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ')
                && this.keys.indexOf(e.key)=== -1
                && !this.game.gameOver) {
                this.keys.push(e.key)
            } else if(e.key === 'Enter' && this.game.gameOver) restartGame()
            else if(e.key === 'd') this.game.debugMode = !this.game.debugMode

        })
        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY
        })
        window.addEventListener('touchmove', e => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY
            if(swipeDistance < -this.touchTreshold && this.lastKey !== 'swipe up') this.lastKey = 'swipe up'
            else if(swipeDistance > this.touchTreshold && this.lastKey !== 'swipe down') {
                this.lastKey = 'swipe down'
            }
        })
        /*window.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1)
            this.keys.splice(this.keys.indexOf('swipe down'), 1)
        })*/    //для управления с мобилок
    }
}