const video = document.querySelector('#video');

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){

    const constraints = {
        video: true,
        audio: false
    }
    navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream)

}



const barcodeDetector = new BarcodeDetector({formats: ['qr_code']});


window.ctx = canvas.getContext("2d");
const detectCode = () => {
    barcodeDetector.detect(video).then(codes =>{
        if(codes.length == 0) return;

        for(const barcode of codes){
            ctx.beginPath()
for (const [i, {x, y}] of barcode['cornerPoints'].entries()) {
	  if (i === 0) {
	 	
	  	ctx.moveTo(x, y)
	  	continue
	  }
	
	  ctx.lineTo(x, y)
}
ctx.closePath()
ctx.strokeStyle = 'white';
ctx.stroke();

    


            console.log(barcode)
            alert("QR Kod Okundu. Sayfayı ziyaret için butonu tıklayın")
            let link = barcode["rawValue"]
            let getLink = document.getElementById('link')
            getLink.href = link
           


        
        }
    }).catch(err =>{
        console.log(err)
        alert("QR Kod Okunamadı")
    })
}

setInterval(detectCode,3000)


function reloadPage(){
    // window.location.reload();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
