export default {
    scoreGrade: function(score) {
        if(score > 80) {
            return {
                startColor: '#5358DB',
                endColor: '#379AF1',                
                textColor: '#5651D9',
                shadowColor: 'rgba(86, 81, 217, .48)'
            }
        }else if(score > 61 && score <= 80) {
            return {
                startColor: '#FFB600',
                endColor: '#FFDB68',                
                textColor: '#FFB703',
                shadowColor: 'rgba(217, 179, 81, .48)'
            }
        }else if(score > 41 && score <= 60) {
            return {
                startColor: '#FF8200',
                endColor: '#FFAE68',                
                textColor: '#FF9225',
                shadowColor: 'rgba(239, 131, 56 , .48)'
            }
        }else if(score > 21 && score <= 40) {
            return {
                startColor: '#FF6600',
                endColor: '#FFA068',                
                textColor: '#FF6103',
                shadowColor: 'rgba(217, 153, 81 , .48)'
            }
        }else if(score <= 20) {
            return {
                startColor: '#DA1B1B',
                endColor: '#FF211A',                
                textColor: '#DA1B1B',
                shadowColor: 'rgba(217, 81, 81, .48)'
            }
        }
    },
    resetPx: function() {
        return  parseFloat(document.getElementsByTagName('html')[0].style.fontSize)/100       
    },
    canvasCircle: function(element,score,color) {
        if(!color) {
            color = '#fefefe'
        }
        let colorObj = this.scoreGrade(score)
        // let rate = this.resetPx()
        let rate = 1
        //圆心 
        let widthNum = 58
        let shadowBlur = 3
        let radiusWith = widthNum*rate
        let c = document.getElementById(element)
        // c.width = 2*radiusWith + 'px'
        // c.height = 2*radiusWith + 'px'       
        let context = c.getContext('2d')
        context.clearRect(shadowBlur, shadowBlur, 2*radiusWith, 2*radiusWith)
        // ***开始画一个灰色的圆      
        context.beginPath()
        // 坐标移动到圆心  
        context.moveTo(radiusWith, radiusWith)
        // 画阴影
        // context.shadowOffsetX = -1      
        // context.shadowOffsetY = 1
        context.shadowBlur = 2 * shadowBlur
        context.shadowColor = colorObj.shadowColor
        // 画圆,圆心是radiusWith,radiusWith,半径radiusWith,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
        context.arc(radiusWith + shadowBlur, radiusWith + shadowBlur, radiusWith, 0, Math.PI * 2, false)
        context.closePath()
        // 填充颜色  
        context.fillStyle = '#f0f0f0';
        context.fill()
        // ***灰色的圆画完  

        // 画进度  
        context.beginPath()
        // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
        context.moveTo(radiusWith, radiusWith)
        // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
        context.arc(radiusWith + shadowBlur, radiusWith + shadowBlur, radiusWith, -0.5*Math.PI, score*Math.PI*0.02-0.5*Math.PI, false);
        context.closePath()
        let linear = context.createLinearGradient(radiusWith, 0, radiusWith, 2*radiusWith)
        linear.addColorStop(0,colorObj.startColor)
        linear.addColorStop(1,colorObj.endColor)
        context.fillStyle = linear
        context.fill()

        // 画内部空白
        context.beginPath()
        context.moveTo(radiusWith + shadowBlur, radiusWith + shadowBlur)
        context.arc(radiusWith + shadowBlur, radiusWith + shadowBlur, (radiusWith - shadowBlur)*rate, 0, Math.PI * 2, true)
        context.closePath()
        context.fillStyle = color
        context.fill()

        context.font = 'bold 28px Arial'
        context.fillStyle = colorObj.textColor
        context.textAlign = 'center'  
        context.textBaseline = 'middle'
        context.shadowColor = '#fff'
        if(score < 100) {
            context.fillText(score, 55*rate,radiusWith*rate)
            context.font = '13px Arial'
            context.fillText('分', 78*rate, (radiusWith + shadowBlur)*rate)
        }else {
            context.fillText(score, 51*rate, radiusWith*rate)
            context.font = '.13px Arial'
            context.fillText('分', 83*rate, (radiusWith + shadowBlur)*rate)  
        } 
    }

}