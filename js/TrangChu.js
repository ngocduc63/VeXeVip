//Sự kiện chuyển slide nhận xét của KH
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



//Sự kiện Submenu
const user = document.querySelector('.user');
const subMenu = document.querySelector('.sub-menu');

user.addEventListener('click', function() {
    console.log('ok');
    subMenu.classList.toggle('open');
});
// log out
document.querySelector('#logout').addEventListener('click', function(){
   window.location.href = "index.html";
});
// next page buy ticket
document.querySelector('.btn-search').addEventListener('click', function(){
    window.location.href = "BuyTicket.html";
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
