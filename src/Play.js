class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MAX = 700
        this.SHOT_VELOCITY_Y_MIN = 1100
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4) //set the collider to circle
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)
        
        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width/2, width - wallA.width/2))
        wallA.body.setImmovable(true)

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(wallB.width/2 - 1)
        wallB.body.setImmovable(true)
        wallB.body.setCollideWorldBounds(true)
        wallB.body.setVelocityX(100)
        wallB.setBounce(1)

        this.walls = this.add.group( [wallA, wallB] )

        // add one-way
        this.oneWay = this.physics.add.sprite(width/2, height/4*3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.body.checkCollision.down = false
        this.oneWay.body.setImmovable(true)

        //add shot counter
        this.shotCount = 0
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }
        this.shotCountText = this.add.text(width/10, height/20, this.shotCount, textConfig)

        // add pointer input
        this.input.on('pointerdown', (pointer) => {
            let shotDirectionY = pointer.y <= this.ball.y ? 1 : -1
            let shotDirectionX = (pointer.x - this.ball.x)/30//((pointer.x-(width/2))/width)*2
            console.log(shotDirectionX)
            this.ball.body.setVelocityX((this.SHOT_VELOCITY_X) * -shotDirectionX)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirectionY)
            this.shotCount++
            this.shotCountText.text = this.shotCount
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {   //a collider in Phaser is not a collision box, but an event that happens on collision
            //ball.destroy()
            ball.setVelocity(0)
            ball.setX(width / 2)
            ball.setY(height - height / 10)
            this.shotCount = 0
            this.shotCountText.text = this.shotCount

        })

        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls) //if there was a callback function, it would use the specific wall that collided, not the whole group

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay) 
    }

    update() {
        
        /*if (this.wallB.x > width - width/6){
            console.log("move left")
            this.wallB.body.setVelocityX(-100)
        }
        if (this.wallB.x < width/6){
           this.wallB.body.setVelocityX(100)
        }*/


    }
}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[X] Add ball reset logic on successful shot
[X] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[X] Make one obstacle move left/right and bounce against screen edges
[Partial (just shot counter)] Create and display shot counter, score, and successful shot percentage
*/