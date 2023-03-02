var player1Img, player2Img, bullet
var gamestate = "play"
var score = 0
var health = 5

function preload() {
    player1Img = loadAnimation("assets/player1/helicopter-0.png", "assets/player1/helicopter-1.png", "assets/player1/helicopter-2.png",
        "assets/player1/helicopter-3.png", "assets/player1/helicopter-4.png", "assets/player1/helicopter-5.png", "assets/player1/helicopter-6.png",
        "assets/player1/helicopter-7.png", "assets/player1/helicopter-8.png", "assets/player1/helicopter-9.png")

    player2Img = loadAnimation("assets/player2/tank-0.png", "assets/player2/tank-1.png", "assets/player2/tank-2.png",
        "assets/player2/tank-3.png", "assets/player2/tank-4.png", "assets/player2/tank-5.png", "assets/player2/tank-6.png", "assets/player2/tank-7.png",)

    villian1Img = loadAnimation("assets/villan 1/air villan-0.png", "assets/villan 1/air villan-1.png", "assets/villan 1/air villan-2.png",
        "assets/villan 1/air villan-3.png", "assets/villan 1/air villan-4.png", "assets/villan 1/air villan-5.png", "assets/villan 1/air villan-6.png", "assets/villan 1/air villan-7.png",
        "assets/villan 1/air villan-8.png", "assets/villan 1/air villan-9.png", "assets/villan 1/air villan-10.png", "assets/villan 1/air villan-11.png", "assets/villan 1/air villan-12.png", "assets/villan 1/air villan-13.png",
        "assets/villan 1/air villan-14.png", "assets/villan 1/air villan-15.png", "assets/villan 1/air villan-16.png")

    villian2Img = loadAnimation("assets/villian2/villan2-3.png", "assets/villian2/villan2-4.png", "assets/villian2/villan2-5.png", "assets/villian2/villan2-6.png",
        "assets/villian2/villan2-7.png", "assets/villian2/villan2-8.png", "assets/villian2/villan2-9.png", "assets/villian2/villan2-10.png", "assets/villian2/villan2-11.png", "assets/villian2/villan2-12.png",)

    villian3Img = loadAnimation("assets/villian3/villan4-0.png", "assets/villian3/villan4-1.png", "assets/villian3/villan4-2.png", "assets/villian3/villan4-3.png")

    bulletImg = loadImage("bullet.png")
    cityImg = loadImage("city0.jpg")
    groundImg = loadImage("ground.png")
    go = loadImage("assets/GameOver.png")
    bgs = loadSound("assets/Sounds/BackgroundSound.wav")
    ss = loadSound("assets/Sounds/shootSound.wav")
}
function setup() {
    createCanvas(800, 400)
    

    bulletGroup = new Group()

    ground = createSprite(width / 2, height / 2)
    ground.addImage(groundImg)

    bgs.loop()
    player1 = createSprite(70, 100)
    player1.addAnimation("heli", player1Img)
    player1.scale = 0.8
   
    player2 = createSprite(100, 300)
    player2.addAnimation("tank", player2Img)
    player2.scale = 0.8
    villianGroup = new Group()

}
function draw() {
    
    background(cityImg)

    fill("black")
    textSize(20)
    text("Air Attack",width/2-100,20)

    if(frameCount<100)
        text("Press space or Z key to shoot",width/2-100,35)
    
    text("Score:" + score, width - 100, 20)
    text("Health:" + health, width - 100, 40)

    if (gamestate === "play") {
        handlePlayerControls()
        createObstacles()

        if (keyDown("space") || keyDown("z")) {
            ss.play()
            if (keyDown("z")) {
                var x = player2.x + 100
                var y = player2.y
                createBullet(x, y)
            }
            else if (keyDown("space")) {
                var x = player1.x + 100
                var y = player1.y
                createBullet(x, y)
            }
        }
        if (bullet !== undefined) {
            bullet.overlap(villianGroup, creditScore)
        }
       for (var i = 0; i < villianGroup.length; i++) {
            if (player1.overlap(villianGroup[i]) || player2.overlap(villianGroup[i])) {
                villianGroup[i].destroy()
                if (health > 0) {
                    health = health - 1
                }

            }
        }
        if (health === 0) {
            gamestate = "end"
        }
        

    }
    else if (gamestate === "end") {
        bgs.stop()
        villianGroup.setVelocityXEach(0)
        villianGroup.destroyEach()
        player1.destroy()
        player2.destroy()
        score = 0
        gameOver = createSprite(width/2,height/2)
        gameOver.addImage(go)



    }

    drawSprites()
}
function reducehealth(collector,collected){
    collected.remove()
    health = health-1
}

function creditScore(collector, collected) {
    collected.remove()
    collector.remove()
    bullet.x = 850
    score += 1

}
function createBullet(a, b) {
    if (bullet) {
        if (bullet.x >= 800) {
            bullet = createSprite(a, b)
            bullet.addImage(bulletImg)
            bullet.scale = 0.1
            bullet.velocityX = 5
        }

    }
    else {

        bullet = createSprite(a, b)
        bullet.addImage(bulletImg)
        bullet.scale = 0.1
        bullet.velocityX = 5
    }



}
function createObstacles() {
    if (frameCount % 150 === 0) {

        villian1 = createSprite(850, 100)
        villian1.addAnimation("plane villian", villian1Img)
        villian1.velocityX = -5
        villian1.scale = 1.2
        villian1.lifetime = 160
        
        villianGroup.add(villian1)
        villian1.setCollider("rectangle", 0, 0, villian1.width - 50, villian1.height)

    }
    if (frameCount % 150 === 0) {
        villian2 = createSprite(850, 280)
        villian2.addAnimation("land villian1", villian2Img)
        villian2.velocityX = -5
        villian2.scale = 0.8
        villian2.lifetime = 160
        villianGroup.add(villian2)
    }

    if (frameCount % 190 === 0) {
        villian3 = createSprite(850, 300)
        villian3.addAnimation("land villian3", villian3Img)
        villian3.velocityX = -5
        villian3.scale = 0.6
        villian3.lifetime = 160
        villianGroup.add(villian3)
       
    }
}


function handlePlayerControls() {
    if (keyDown("up") && player1.y > 110) {
        player1.y -= 3
    }

    if (keyDown("down") && player1.y < 180 && player1.y > 50) {
        player1.y += 3
    }

    if (keyDown("right") && player1.x < 700) {
        player1.x += 3
    }

    if (keyDown("left") && player1.x > 110) {
        player1.x -= 3
    }

    if (keyDown("d") && player2.x < 700) {
        player2.x += 3
    }
    if (keyDown("a") && player2.x > 110) {
        player2.x -= 3
    }
}

