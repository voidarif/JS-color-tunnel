const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight
canvas.width = innerWidth

const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}
addEventListener('mousemove', (e)=>{
	mouse.x = e.clientX 
	mouse.y = e.clientY
})

class Particles{
	constructor(x, y, radius, color,velocity){
		this.x = x 
		this.y = y 
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.ttl = 500 
	}

	draw(){
		c.beginPath()
		c.fillStyle = this.color
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
		c.fill()
	}

	update(){
		this.draw()

		this.x += this.velocity.x 
		this.y += this.velocity.y 
		this.ttl--
	}
}

var particles = []
const radius = 100
let hue = 0 
let hueRadians = 0
let particleCount = 20

	for (var i = 0; i < particleCount; i++) {
		const radian = (Math.PI * 2) / particleCount
		let x = canvas.width / 2 
		let y = canvas.height / 2 
		particles.push(new Particles(x, y, 5 , 'blue',{x: Math.cos(radian * i), y: Math.sin(radian * i)}))
	}


function generateRing() {
	setTimeout(generateRing, 300)
	hue = Math.sin(hueRadians)
	for (var i = 0; i < 30; i++) {
		const radian = (Math.PI * 2) / 30
		let x = mouse.x  /*canvas.width / 2 */
		let y = mouse.y /*canvas.height / 2*/ 
		let color = 'hsl('+ Math.abs(hue * 360) +', 50%, 50%)'
		particles.push(new Particles(x, y, 5, color,{x: Math.cos(radian * i) * 5, y: Math.sin(radian * i) * 5}))

		console.log(particles)
	}
	hueRadians += 0.01 

}

function animate() {
	requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.1)'
	c.fillRect(0, 0, canvas.width, canvas.height)

	particles.forEach((particle, index)=>{
		if(particle.ttl < 0){
			particles.splice(index, 1)
		}else{
			particle.update()
		}
	})
}

animate()
generateRing()

/*let x = canvas.width / 2 + Math.cos(radian * i) * radius
let y = canvas.height / 2 + Math.sin(radian * i) * radius*/