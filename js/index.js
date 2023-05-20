window.addEventListener("load", function() {
    const nextBtn = document.querySelector(".btn-next");
    const prevBtn = document.querySelector(".btn-prev");
    const fbItems = document.querySelector('.fb-items');
    const listBtnItem = document.querySelectorAll('.btn-item');
    const temp = '-992px';
    
    nextBtn.addEventListener("click", function(){
        handleChangeSlider(1);
    });
    prevBtn.addEventListener("click", function(){
        handleChangeSlider(-1);
    });

    function handleChangeSlider(direction) {
        if(direction == 1) {
            fbItems.style.left = temp;
            listBtnItem[0].style.backgroundColor = '#fff';
            listBtnItem[1].style.backgroundColor = 'var(--primary-color)';
        } else if (direction == -1) {
            listBtnItem[0].style.backgroundColor = 'var(--primary-color)';
            listBtnItem[1].style.backgroundColor = '#fff';
            fbItems.style.left = 0;
        }
    }
});
// list thanh pho
const listTP  = document.querySelectorAll('.thanh-pho-list');
const inputList = document.querySelectorAll('.tinh-thanh-input input');
const btnSwap = document.querySelector('.swap');

const listThanhPho = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", 
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", 
    "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", 
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", 
    "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", 
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", 
    "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", 
    "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", 
    "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", 
    "Phú Yên", "Cần Thơ", "Đà Nẵng", "Hải Phòng","Hà Nội", "TP HCM"
];
// load chon thanh pho
const itemThanhPho = listThanhPho.map(thanhPho => `<li class='thanh-pho-item' >${thanhPho}</li>`);
listTP.forEach(value =>{
    value.onmousedown = function(e){
        e.preventDefault();
    }
    value.innerHTML = itemThanhPho.join('');
});
inputList.forEach(input =>{
    input.addEventListener('click', function(){
        this.select();
    });
    input.addEventListener('keyup', function(){
        const inputText = this;
        const userNhap = input.value.toLowerCase();
        const listUserNhap = listThanhPho.filter(value => value.toLowerCase().indexOf(userNhap) !== -1);
        const item = listUserNhap.map(thanhPho => `<li class='thanh-pho-item' >${thanhPho}</li>`);
        listTP.forEach(value =>{
            value.innerHTML = item.join('');
        });
        const itemThanhPho = document.querySelectorAll('.thanh-pho-item');
        itemThanhPho.forEach(value => {
            value.addEventListener('click', function(){
                inputText.value = value.innerText;
            })
        });
    })
});

// swap thanh pho
btnSwap.addEventListener('click', function(){
    const tmp= inputList[0].value;
    inputList[0].value = inputList[1].value;
    inputList[1].value = tmp;
});

// set value date mặc định 
const date = new Date();
const optionDate = {day: '2-digit', month : '2-digit', year: 'numeric'};
const inputDate = document.querySelector('.input-ngay-di');
const today = date.toLocaleDateString('en-GB', optionDate);
inputDate.value = today.split('/').reverse().join('-');

//Sự kiện nút đăng nhập
const loginButton = document.querySelector('.btn-login');
const modal = document.querySelector('.modal-login');
loginButton.addEventListener('click', function() {
    modal.classList.add('modal-open');
});

//Sự kiện chuyển form đăng kí, đăng nhập
const changeFormRegister = document.querySelector('.modal-changeForm-register');
const changeFormLogin = document.querySelector('.modal-changeForm-login');
const registerModal = document.querySelector('.modal-register');
changeFormRegister.addEventListener('click', function() {
    registerModal.classList.add('modal-open');
    modal.classList.remove('modal-open');
});
changeFormLogin.addEventListener('click', function() {
    registerModal.classList.remove('modal-open');
    modal.classList.add('modal-open');
});

//Sự kiện nút đóng form đăng nhập
const closeBtn = document.querySelector('.modal-close-login');
closeBtn.addEventListener('click', function() {
    modal.classList.remove('modal-open');
});
//Sự kiện nút đóng form đăng kí
const closeReg = document.querySelector('.modal-close-register');
closeReg.addEventListener('click', function() {
    registerModal.classList.remove('modal-open');
});

//Sự kiện nút Tiếp tục
const btnTiepTuc = document.querySelector('.btn-continue');
const btnTiepTucDK = document.querySelector('.btn-continueDK');

function validatePhoneNumber(phoneNumber) {
    var regex = /^0\d{9}$/;
    return regex.test(phoneNumber.trim());
}
document.addEventListener("input-phoneNumber", function() {
    const sdt = document.getElementById('phone').value;
    if(sdt.length == 0) {
        document.getElementById('error').innerHTML = "Xin hãy nhập số điện thoại";
    } else {
        if(!validatePhoneNumber(sdt)) {
            document.getElementById('error').innerHTML = "Bạn cần nhập đúng định dạng số điện thoại";
        } else {
            document.getElementById('error').innerHTML = "";
        }
    }
});
btnTiepTuc.addEventListener('click', function() {
    const sdt = document.getElementById('phone').value;
    if(sdt.length <= 0) {
        document.getElementById('error').innerHTML = "Xin hãy nhập số điện thoại";
    } else {
        if(!validatePhoneNumber(sdt)) {
            document.getElementById('error').innerHTML = "Bạn cần nhập đúng định dạng số điện thoại";
        } else {
            document.getElementById('error').innerHTML = "";
            // dang nhap thanh cong
            window.location.href = "TrangChu.html";
        }
    }
});
btnTiepTucDK.addEventListener('click', function() {
    const sdt = document.getElementById('phoneDK').value;
    if(sdt.length <= 0) {
        document.getElementById('errorDK').innerHTML = "Xin hãy nhập số điện thoại";
    } else {
        if(!validatePhoneNumber(sdt)) {
            document.getElementById('errorDK').innerHTML = "Bạn cần nhập đúng định dạng số điện thoại";
        } else {
            document.getElementById('errorDK').innerHTML = "";
            // dang nhap thanh cong
            window.location.href = "TrangChu.html";
        }
    }
});
// bam enter de dang nhap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      if(modal.classList.contains('modal-open')){
        btnTiepTuc.click();
      }else if(registerModal.classList.contains('modal-open')){
        btnTiepTucDK.click();
      }
    }
});
// next page buy ticket
document.querySelector('.btn-search').addEventListener('click', function(){
    alert('Bạn cần đăng nhập để mua vé');
    modal.classList.add('modal-open');
})
// navbar selected

const navbarItem = document.querySelectorAll('.navbar-item')
navbarItem.forEach(function (item) {
    item.addEventListener('click', function (event) {
        event.preventDefault();

        const target = this.querySelector('.navbar-item a').getAttribute('href')
        if (target) {
            const targetElement = document.querySelector(target);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})

const btnScrollUp = document.querySelector('.scroll-up')
const header = document.querySelector('#header')

btnScrollUp.addEventListener('click', function (item) {
    item.preventDefault();

    header.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})
window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        btnScrollUp.style.display = 'none';
    } else {
        btnScrollUp.style.animation= 'phai-trai .3s linear';
        btnScrollUp.style.display = 'block';
    }
})