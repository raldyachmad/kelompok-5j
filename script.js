const beasiswaItem = document.querySelectorAll('div.beasiswa-item')
const beasiswaForm = document.getElementById('beasiswa')

beasiswaItem.forEach(item => {
  item.addEventListener("click", () => {
    beasiswaItem.forEach(item => item.classList.remove("active"));
    item.classList.add("active");
    beasiswaForm.value = item.querySelector('h2').innerText
  });
})
const slide1=document.querySelector('.slide-1')
const slide2=document.querySelector('.slide-2')
const slide3=document.querySelector('.slide-3')
function gotoSlide(slideNumber) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => (slide.style.display = "none"));
  if(slideNumber==2){
    if(beasiswaItem[0].classList.contains("active")|| beasiswaItem[1].classList.contains("active")){
      slide1.style.display='none'
      slide2.style.display='block'
    } else  {
      alert('Anda Belum Memilih Satupun, Pilih Salah Satu!')
    }
  } else if (slideNumber==3){
    checkFormSlide2()
  } else if (slideNumber==1){
    if (beasiswaItem[0].classList)
    slide2.style.display='none';
    slide3.style.display='none';
    slide1.style.display='block';
  }
}

const formSlide2 = document.getElementById("formSlide2");
const btnSlide2 = document.getElementById("btnSlide2");

function checkFormSlide2() {
  if (formSlide2.checkValidity()) {
    alert('berhasil')
    btnSlide2.disabled = true;
    slide2.style.display='none';
    slide3.style.display='block';
    showResult()
  } else {
    btnSlide2.disabled = false;
    alert('Form Belum Lengkap!')
    const input = document.querySelectorAll('input,select')
    input.forEach((e)=>{
      if (e.checkValidity()==false){
        e.style.borderColor='red'
      }
      e.addEventListener('blur',()=>{
        e.style.borderColor='';
      })
    })
  }
}

const diterima = document.getElementById('diterima')
const tidakDiterima = document.getElementById('tidakDiterima')
// const abc = ;

function showResult() {
  const ipkTerakhir = parseFloat(document.getElementById("ipk_terakhir").value);
  if (ipkTerakhir >= 3) {
    const pisahNama = document.getElementById('nama').value.split(" ")
    const fistName = pisahNama[0];
    const inputBeasiswa = document.getElementById('beasiswa').value;
    // const kategoriBeasiswa = document.getElementById('namaBeasiswa');
    tidakDiterima.style.display="none !important"
    diterima.style.display='block';
    diterima.querySelector('#nickname').textContent=fistName;
    diterima.querySelector('#namaBeasiswa').textContent=inputBeasiswa;
  }  else{
    tidakDiterima.style.display='block';
    diterima.querySelector('#nickname').textContent=fistName;
  }
  
}
