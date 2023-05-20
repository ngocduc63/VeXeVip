// Thời gian bắt đầu đếm ngược (10 phút)
var countdownTime = 10 * 60;
function updateCountdown() {
  var minutes = Math.floor(countdownTime / 60);
  var seconds = countdownTime % 60;
  document.getElementById("dem-nguoc").innerHTML = minutes + " phút " + seconds + " giây";
  countdownTime--;
  if (countdownTime < 0) {
    clearInterval(countdownInterval);
    document.getElementById("dem-nguoc").innerHTML = "Hết thời gian thanh toán!";
  }
}
var countdownInterval = setInterval(updateCountdown, 1000);
let nameTK = sessionStorage.getItem("name");
let phoneTK = sessionStorage.getItem("phone");
let emailTK = sessionStorage.getItem("email");
document.querySelectorAll('.infor-chitiet span')[0].innerHTML = nameTK;
document.querySelectorAll('.infor-chitiet span')[1].innerHTML = phoneTK;
document.querySelectorAll('.infor-chitiet span')[2].innerHTML = emailTK;

// Chon phuong thuc thanh toan
function toggleHuongDan(phuongThuc) {
  const huongDanElements = document.getElementsByClassName('huong-dan');
  // Ẩn tất cả các hướng dẫn
  for (let i = 0; i < huongDanElements.length; i++) {
    huongDanElements[i].style.display = 'none';
  }

  // Hiển thị hướng dẫn cho phương thức thanh toán được chọn
  const huongDanPhuongThuc = document.getElementById('huongDan' + phuongThuc);
  if (huongDanPhuongThuc) {
    huongDanPhuongThuc.style.display = 'block';
  }
}

document.querySelectorAll('.left-choice').forEach(function (li) {
  li.addEventListener('click', function () {
    const btn = li.querySelector('input[type="radio"]');
    btn.checked = true;
    const phuongThuc = btn.getAttribute('id');
    toggleHuongDan(phuongThuc);
  });
});


const cacLuaChon = document.querySelectorAll('.left-choice input');
window.addEventListener('load', function () {
  cacLuaChon[0].checked = true;
});

// sửa thông tin hành khách

const udBtns = document.querySelector('.js-update-infor-ca-nhan');
const suaTTKH = document.querySelector('.js-sua-thong-tin-KH');
const suaTTKHClose = document.querySelector('.js-sua-tt-close');
const suaTTKHContainer = document.querySelector('.js-sua-tt-KH-container');

function showUpdateInforKH() {
  suaTTKH.classList.add('open');
}

function hideUpdateInforKH() {
  suaTTKH.classList.remove('open');
}

udBtns.addEventListener('click', showUpdateInforKH);

suaTTKHClose.addEventListener('click', hideUpdateInforKH);

suaTTKH.addEventListener('click', hideUpdateInforKH);

suaTTKHContainer.addEventListener('click', function (event) {
  event.stopPropagation()
})

//Sửa điếm đón
const suaDDBtn = document.querySelector('.js-update-infor-diem-don');
const suaTTDD = document.querySelector('.js-sua-thong-tin-diem-don');
const suaTTDDClose = document.querySelector('.js-sua-tt-diem-don-close');
const suaTTDDContainer = document.querySelector('.js-sua-tt-diem-don-container');

function showUpdateInforDD() {
  suaTTDD.classList.add('open');
  const cacLuaChonDiemDon = document.querySelectorAll('.dia-diem-don input');
  cacLuaChonDiemDon[0].checked = true;
}

function hideUpdateInforDD() {
  suaTTDD.classList.remove('open');
}

suaDDBtn.addEventListener('click', showUpdateInforDD);

suaTTDDClose.addEventListener('click', hideUpdateInforDD);

suaTTDD.addEventListener('click', hideUpdateInforDD);


suaTTDDContainer.addEventListener('click', function (event) {
  event.stopPropagation()
})

//Sửa điểm trả
const suaDTBtn = document.querySelector('.js-update-infor-diem-tra');
const suaTTDT = document.querySelector('.js-sua-thong-tin-diem-tra');
const suaTTDTClose = document.querySelector('.sua-tt-diem-tra-close');
const suaTTDTContainer = document.querySelector('.js-sua-tt-diem-don-container');

function showUpdateInforDT() {
  suaTTDT.classList.add('open');
  const cacLuaChonDiemTra = document.querySelectorAll('.dia-diem-tra input');
  // Đặt lựa chọn đầu tiên là lựa chọn mặc định
  cacLuaChonDiemTra[0].checked = true;
}

function hideUpdateInforDT() {
  suaTTDT.classList.remove('open');
}

suaDTBtn.addEventListener('click', showUpdateInforDT);

suaTTDTClose.addEventListener('click', hideUpdateInforDT);

//bug lỗi tùm lum
// document.querySelector('.sua-thong-tin-diem-tra').addEventListener('click',function(){
//   this.classList.remove('open');
// });

suaTTDTContainer.addEventListener('click', function (event) {
  event.stopPropagation()
})

//sửa thông tin khách hàng
const updateBtn = document.getElementById("update"); // Lấy đối tượng button cập nhật
const form = document.querySelector('.js-sua-thong-tin-KH');
const updateBtn1 = document.querySelector('#update');
var name = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var email = document.getElementById("email").value;

document.addEventListener("input", function () {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  let test = false;
  if (name.length == 0) {
    test = true;
    document.getElementById('empty-name').innerHTML = "Bạn chưa nhập họ tên";
  } else {
    if (!validateName(name)) {
      document.getElementById('empty-name').innerHTML = "Họ tên không hợp lệ";
      test = true
    } else {
      document.getElementById('empty-name').innerHTML = "";
    }
  }

  if (phone.length == 0) {
    test = true;
    document.getElementById('empty-phone').innerHTML = "Bạn chưa nhập số điện thoại";
  } else {
    if (!validatePhone(phone)) {
      document.getElementById('empty-phone').innerHTML = "Số điện thoại không hợp lệ";
      test = true;
    } else {
      document.getElementById('empty-phone').innerHTML = "";
    }
  }

  if (email.length == 0) {
    test = true;
    document.getElementById('empty-email').innerHTML = "Bạn chưa nhập email";
  } else {
    if (!validateEmail(email)) {
      document.getElementById('empty-email').innerHTML = "Email không hợp lệ";
      test = true;
    } else {
      document.getElementById('empty-email').innerHTML = "";
    }
  }

  if (test) {
    document.getElementById("update").disabled = true;
    form.classList.add('hidden');
  } else {
    document.getElementById("update").disabled = false;
  }

});

updateBtn.addEventListener("click", function () {
  const nameInput = document.getElementById("name"); // Lấy đối tượng input tên hành khách
  const nameSpan = document.querySelector('[data-name="ten-hanh-khach"]'); // Lấy đối tượng span tên hành khách

  const phoneInput = document.getElementById("phone"); // Lấy đối tượng input số điện thoại
  const phoneSpan = document.querySelector('[data-name="so-dien-thoai"]'); // Lấy đối tượng span số điện thoại

  const emailInput = document.getElementById("email"); // Lấy đối tượng input email
  const emailSpan = document.querySelector('[data-name="email"]'); // Lấy đối tượng span email

  const cmndInput = document.getElementById("CMND"); // Lấy đối tượng input số CMND/CCCD
  const cmndSpan = document.querySelector('[data-name="so-cmnd"]'); // Lấy đối tượng span số CMND/CCCD

  // Cập nhật các giá trị của span từ các giá trị của input tương ứng
  nameSpan.textContent = nameInput.value;
  phoneSpan.textContent = phoneInput.value;
  emailSpan.textContent = emailInput.value;
  cmndSpan.textContent = cmndInput.value;
  suaTTKH.classList.remove('open');
  console.log(nameInput.value);
  nameTK = nameInput.value;
  phoneTK = phoneInput.value;
  emailTK = emailInput.value;
  sessionStorage.setItem("name", nameTK);
  sessionStorage.setItem("phone", phoneTK);
  sessionStorage.setItem("email", emailTK);
});

function validateName(name) {
  var regex = /^[\p{L}\s]+$/u;
  return regex.test(name.trim());
}

function validatePhone(phone) {
  var regex = /^0\d{9}$/;
  return regex.test(phone.trim());
}

function validateEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

//Thay đổi điểm trả
const updateButton1 = document.getElementById('update-diem-tra');
updateButton1.addEventListener('click', function () {
  const newLocations = document.querySelectorAll('.dia-diem-tra input[type="radio"]');
  newLocations.forEach(function (location) {
    if (location.checked) {
      const newTime = location.parentElement.querySelector('.time-diem-tra-moi').innerText;
      const newLocation = location.parentElement.querySelector('p').innerText;
      document.querySelector('#time-diem-tra').innerText = newTime;
      document.querySelector('[data-name="diem-tra"]').innerText = newLocation;
      suaTTDT.classList.remove('open');
    }
  });
});
document.querySelectorAll('.dia-diem-tra').forEach(function (li) {
  li.addEventListener('click', function () {
    const btn = li.querySelector('input[type = "radio"]');
    btn.checked = true;
  });
});

// Update điểm đón
const updateButtonDiemDon = document.getElementById('update-diem-don');
updateButtonDiemDon.addEventListener('click', function () {
  const newLocationsDiemDon = document.querySelectorAll('.dia-diem-don input[type="radio"]');
  newLocationsDiemDon.forEach(function (location) {
    if (location.checked) {
      const newTime = location.parentElement.querySelector('.time-diem-don-moi').innerText;
      const newLocation = location.parentElement.querySelector('p').innerText;
      document.querySelector('#time-diem-don').innerText = newTime;
      document.querySelector('[data-name="diem-don"]').innerText = newLocation;
      suaTTDD.classList.remove('open');
    }
  })
});

//Bấm vào bất kỳ
document.querySelectorAll('.dia-diem-don').forEach(function (li) {
  li.addEventListener('click', function () {
    const btn = li.querySelector('input[type = "radio"]');
    btn.checked = true;
  });
});

//nút thanh toán
document.querySelector('.btn-thanh-toan-bao-mat').addEventListener('click', function () {
  const thong_bao = document.querySelector('.thong-bao-thanh-toan');
  thong_bao.classList.add('open');
});

function hideThongBaoThanhToan() {
  const thong_bao = document.querySelector('.thong-bao-thanh-toan');
  thong_bao.classList.remove('open');
}

const khong = document.getElementById('khong');
khong.addEventListener('click', hideThongBaoThanhToan);
const thong_bao = document.querySelector('.thong-bao-thanh-toan');
thong_bao.addEventListener('click', hideThongBaoThanhToan);
document.querySelector('.dong-thong-bao').addEventListener('click', hideThongBaoThanhToan);

document.querySelector('.thong-bao-thanh-toan-container').addEventListener('click',function(event){
  event.stopPropagation();
});
const btnOK = document.querySelector('#btn-ok');
btnOK.addEventListener('click', function(){
  window.location.href = 'VeCuaToi.html';
})

// thong tin ve
import {listVe} from './listVe.js';
const tenNhaXe = document.querySelector('.ten-nha-xe');
const thoigiandon = document.querySelector('.thoi-gian-don');
const diaDiemBD = document.querySelector('.dia-diem-bd');
const thoigiantra = document.querySelector('.thoi-gian-tra');
const diadiemKT = document.querySelector('.dia-diem-kt');
const giaVe = document.querySelector('.tong-tien span');
let idVe = sessionStorage.getItem("idVe");
if(idVe){
  const thu = sessionStorage.getItem("thu");
  const ngay = sessionStorage.getItem("ngay");
  const gia = sessionStorage.getItem("giaVe"); 
  listVe.forEach(ve => {
    if(ve.id == idVe){
        tenNhaXe.innerHTML = ve.TenNhaXe;
        thoigiandon.innerHTML = ve.ThoiGianXP + ' - ' + thu + ',' + ngay;
        diaDiemBD.innerHTML = ve.DiaDiemXP;
        thoigiantra.innerHTML = ve.ThoiGianKT + ' - ' + thu + ',' + ngay;
        diadiemKT.innerHTML = ve.DiaDiemKT;
        giaVe.innerHTML = gia.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
        return;
    }
  })
}