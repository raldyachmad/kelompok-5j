const beasiswaItem = document.querySelectorAll("div.beasiswa-item");
const beasiswaForm = document.getElementById("beasiswa");

beasiswaItem.forEach((item) => {
  item.addEventListener("click", () => {
    beasiswaItem.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    beasiswaForm.value = item.querySelector("h2").innerText;
  });
});

const slide1 = document.querySelector(".slide-1");
const slide2 = document.querySelector(".slide-2");
const slide3 = document.querySelector(".slide-3");

function gotoSlide(slideNumber) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => (slide.style.display = "none"));
  if (slideNumber == 2) {
    if (beasiswaItem[0].classList.contains("active") || beasiswaItem[1].classList.contains("active")) {
      slide1.style.display = "none";
      slide2.style.display = "block";
    } else {
      alert("Anda Belum Memilih Satupun, Pilih Salah Satu!");
    }
  } else if (slideNumber == 3) {
    checkFormSlide2();
  } else if (slideNumber == 1) {
    if (beasiswaItem[0].classList) slide2.style.display = "none";
    slide3.style.display = "none";
    slide1.style.display = "block";
  }
}

const formSlide2 = document.getElementById("formSlide2");
const btnSlide2 = document.getElementById("btnSlide2");

function checkFormSlide2() {
  if (formSlide2.checkValidity()) {
    btnSlide2.disabled = true;
    slide2.style.display = "none";
    slide3.style.display = "block";
    showResult();
  } else {
    btnSlide2.disabled = false;
    alert("Form Belum Lengkap!");
    const input = document.querySelectorAll("input,select");
    input.forEach((e) => {
      if (e.checkValidity() == false) {
        e.style.borderColor = "red";
      }
      e.addEventListener("blur", () => {
        e.style.borderColor = "";
      });
    });
  }
}

const diterima = document.getElementById("diterima");
const tidakDiterima = document.getElementById("tidakDiterima");
let dataMahasiswaArr = JSON.parse(sessionStorage.getItem('dataMahasiswaArr')) || [];

function showResult() {
  const ipkTerakhir = parseFloat(document.getElementById("ipk_terakhir").value);
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const noHp = document.getElementById("no_hp").value;
  const semester = document.getElementById("semester").value;
  const inputBeasiswa = document.getElementById("beasiswa").value;
  const berkasSyarat = document.getElementById("berkas_syarat").value;

  // Periksa apakah data berasal dari result.html
  const fromResultPage = window.location.href.includes("result.html");

  if (ipkTerakhir >= 3) {
    const dataMahasiswa = {
      nama: nama,
      email: email,
      noHp: noHp,
      semester: semester,
      ipkTerakhir: ipkTerakhir,
      beasiswa: inputBeasiswa,
      berkasSyarat: berkasSyarat,
    };

    // Jika berasal dari result.html, gunakan data langsung dari session storage
    if (fromResultPage) {
      
    } else {
      dataMahasiswaArr.push(dataMahasiswa);
      sessionStorage.setItem('dataMahasiswaArr', JSON.stringify(dataMahasiswaArr));
    }

    diterima.style.display = "block";
    tidakDiterima.style.display = "none";
    diterima.querySelector("#nickname").textContent = nama;
    diterima.querySelector("#namaBeasiswa").textContent = inputBeasiswa;
  } else {
    diterima.style.display = "none";
    tidakDiterima.style.display = "block";
    tidakDiterima.querySelector("#nickname").textContent = nama;
    tidakDiterima.querySelector("#namaBeasiswa").textContent = inputBeasiswa;
  }
}



// Load the data from session storage and display it in the table
function loadResult() {
  const dataMahasiswaArr = JSON.parse(sessionStorage.getItem('dataMahasiswaArr'));

  if (dataMahasiswaArr) {
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = "";
    console.log(tableBody);

    dataMahasiswaArr.forEach((data, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.nama}</td>
        <td>${data.email}</td>
        <td>${data.noHp}</td>
        <td>${data.semester}</td>
        <td>${data.ipkTerakhir}</td>
        <td>${data.beasiswa}</td>
        <td>${data.berkasSyarat}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// Call the function to load the data when the page is ready
document.addEventListener('DOMContentLoaded', loadResult);
