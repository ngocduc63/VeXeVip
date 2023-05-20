// list ve xe
import { listVe, loadListVe, gioDiSomNhat, gioDiMuonNhat, giaTangDan, giaGiamDan } from './listVe.js';
loadListVe(listVe);

// function validate
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
//call elements
const mainBuyTicket = document.querySelector('.buy-ticket_main');
var listTicket = document.querySelectorAll('.ticket');
const inputList = document.querySelectorAll('.tinh-thanh-input input');
const listTP  = document.querySelectorAll('.thanh-pho-list');
const btnSwap = document.querySelector('.swap');
const btnTimVe = document.querySelector('.btn-search');
const btnPriceRange = document.querySelector('.filter-price__range');
const valuePriceRange = document.querySelector('.filter-price__range--select');
const imgEmpty = 'url("./assets/img/seat_empty.png")';
const imgChecked = 'url("./assets/img/seat_selected.png")';
const listSort = document.querySelectorAll('.buytk-content__header-item');
const filterTime = document.querySelectorAll('.filter-time__item');// thoi gian
const filterCrieria = document.querySelectorAll('.filter-crieria__item');// tieu chuan
const filterPrice = document.querySelector('.filter-price__range--select');// gia ve
const filterLocation = document.querySelectorAll('.filter-search__item');// location
const filterRating = document.querySelectorAll('.filter-rating__icon i');
const btnLogin = document.querySelector('.btn-login');

// làm danh sách vé,
// sắp xếp, 
listSort.forEach((value, index) => {
    value.addEventListener('click', function () {
        listSort.forEach(value =>{
            value.classList.remove('buytk-sort--selected');
        });
        if(index === 0){
            gioDiSomNhat(listVe);
            value.classList.add('buytk-sort--selected');
        }else if (index === 1) {
            gioDiMuonNhat(listVe);
            value.classList.add('buytk-sort--selected');
        }else if (index === 2) {
            giaTangDan(listVe);
            value.classList.add('buytk-sort--selected');
        }else if(index == 3){
            giaGiamDan(listVe);
            value.classList.add('buytk-sort--selected');
        }else {
            // reset
            loadListVe(listVe);
            // nut xem them
            document.querySelectorAll('.ticket:nth-child(n+6)').forEach(value => {
                value.style.display = 'none';
            })
            btnXemThem.style.display = 'block';
            btnXemThem.innerHTML = 'Xem thêm';
        }
    })
})
// bộ lọc,
// loc thoi gian
function loadLocThoiGian(){
    let count = 0;
    let thoiGianBD = 0;
    let thoiGianKT = 0;
    filterTime.forEach((value, index) => {
        
        if(value.classList.contains('filter-time__item--selected')){
            const starTime = value.querySelector('.filter-time__item-time').innerText.split('-')[0].trim().split(':').join('.');
            const EndTime = value.querySelector('.filter-time__item-time').innerText.split('-')[1].trim().split(':').join('.');
            if(count == 0){
                // lan lap dau tien thi luu thoi gian start end lai
                thoiGianBD = parseFloat(starTime);
                thoiGianKT = parseFloat(EndTime);
                //console.log(thoiGianBD + " " + thoiGianKT);
                count ++;
            }else {
                //console.log(parseFloat(starTime) + ' ' + parseFloat(EndTime));
                if(thoiGianBD > parseFloat(starTime)){
                    thoiGianBD = parseFloat(starTime);
                }
                if(thoiGianKT < parseFloat(EndTime)){
                    thoiGianKT = parseFloat(EndTime);
                }
            }
        }
    });
    if(thoiGianBD == 0 && thoiGianKT == 0){
        loadListVe(listVe);
    }else {
        const listVeLoc = listVe.filter(ve => {
            const gioXP = parseFloat(ve.ThoiGianXP.split(':').join('.'));
            return gioXP >= thoiGianBD && gioXP <= thoiGianKT;
          });
          loadListVe(listVeLoc);
    }
}
filterTime.forEach((value, index) => {
    value.addEventListener('click', function(){
        if(value.classList.contains('filter-time__item--selected')){
            value.classList.remove('filter-time__item--selected');
            value.querySelector('.filter-time__item-title').classList.remove('filter-time__item--success');
            value.querySelector('.filter-time__item-time').classList.remove('filter-time__item--success');
        }else {
            value.classList.add('filter-time__item--selected');
            value.querySelector('.filter-time__item-title').classList.add('filter-time__item--success');
            value.querySelector('.filter-time__item-time').classList.add('filter-time__item--success');
        }
        loadLocThoiGian();
    });
});
// loc tieu chi
function loadLocTieuChi(){
    const listTieuChi = {
        'KhongThanhToanTruoc': false,
        'TrungChuyenDonTra': false,
        'GiamGia': false,
        'XemViTri': false,
        'ChonChoNgoi': false
    };
    filterCrieria.forEach((value, index) => {
        if(value.querySelector('.filter-crieria__checkbox').checked){
            if(index === 0){
                 listTieuChi.KhongThanhToanTruoc = true;
            } else if(index === 1 ){
                listTieuChi.TrungChuyenDonTra = true;
            }else if(index === 2 ){
                listTieuChi.GiamGia = true;
            }else if(index === 3 ){
                listTieuChi.XemViTri = true;
            }else if(index === 4 ){
                listTieuChi.ChonChoNgoi = true;
            }
        }else {
            if(index === 0){
                listTieuChi.KhongThanhToanTruoc = false;
           } else if(index === 1 ){
               listTieuChi.TrungChuyenDonTra = false;
           }else if(index === 2 ){
               listTieuChi.GiamGia = false;
           }else if(index === 3 ){
               listTieuChi.XemViTri = false;
           }else if(index === 4 ){
               listTieuChi.ChonChoNgoi = false;
           } 
        }
    });
    // lay ra nhung key duoc chon
    const trueValues = [];
    for (const key in listTieuChi) {
        if (listTieuChi[key] === true) {
            trueValues.push(key);
        }
    }
    if(trueValues.length === 0){
        loadListVe(listVe);
    }else {
        const listVeLoc = listVe.filter(value => {
            let check = 0;
            for(const key in trueValues){
                const x = trueValues[key];
                if(value[x]){
                    check = 1;
                }else {
                    check = 0;
                }
            }
            return check === 1;
        });
        loadListVe(listVeLoc);
    }
}
filterCrieria.forEach(value => {
    value.addEventListener('click', function(){
        const checkBox = value.querySelector('.filter-crieria__checkbox');
        if(checkBox.checked){
            checkBox.checked = false;
        }else {
            checkBox.checked = true;
        }
        loadLocTieuChi();
    });
});
// loc theo gia
function loadLocGiaVe(){
    const price = parseFloat(filterPrice.innerHTML.replace(/\./g, "")) 
    const listVeLoc = listVe.filter(value => value.GiaVe <= price);
    loadListVe(listVeLoc);
}
// loc dia diem
filterLocation.forEach((value, index) => {
    value.addEventListener('click', function(){
        let count = 0;
        if(value.querySelector('input').checked){
            value.querySelector('input').checked = false;
            loadListVe(listVe);
        } else{
            value.querySelector('input').checked = true;
            if(index == 0 || index == 1){
                if(filterLocation[0].querySelector('input').checked && filterLocation[1].querySelector('input').checked){
                    loadListVe(listVe);                  
                    return;
                }else {
                    const listVeLoc = listVe.filter(ve =>{
                        return value.querySelector('.filter-search__item-title').innerHTML === ve.TenNhaXe
                    });
                    loadListVe(listVeLoc);
                }
            }else if (index == 6 || index == 7){
                if(index == 6) {
                    loadListVe(null);
                }else {
                    loadListVe(listVe);
                }
            }else {
                if(index == 2){
                    const listVeLoc = listVe.filter(ve =>{
                        return ve.TenNhaXe === 'Tuấn Anh'
                    });
                    loadListVe(listVeLoc);
                }else if (index == 4){
                    const listVeLoc = listVe.filter(ve =>{
                        return ve.TenNhaXe === 'Hải Âu'
                    });
                    loadListVe(listVeLoc);
                }else {
                    loadListVe(null);
                }
            }
        }
    });
})
// filter rating 

filterRating.forEach(value => {
    value.addEventListener('click', function(){
        if(value.classList.contains('icon-star-selected')){
            value.classList.remove('icon-star-selected');
            value.classList.add('icon-star-disable');
        }else {
            value.classList.add('icon-star-selected');
            value.classList.remove('icon-star-disable');
        }
        let count= 0;
        filterRating.forEach(value => {
            if(value.classList.contains('icon-star-selected')) count ++;
        })
        if(count < 5){
            loadListVe(listVe);
        }else {
            loadListVe(null);
        }
    })
})

// validate form
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
layNgay();
inputDate.addEventListener('change', function(){
    layNgay();
})
// lay ra ngay 
function layNgay(){
    const inputDate = document.querySelector('.input-ngay-di');
    const selectedDate = new Date(inputDate.value);

    let dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: 'long' });
    let month = selectedDate.toLocaleDateString("en-US", { month: 'long' });
    const dayOfMonth = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    if(month === 'January'){
        month = '01';
    }else if(month === 'February'){
        month = '02';
    }else if(month === 'March'){
        month = '03';
    }else if(month === 'April'){
        month = '04';
    }else if(month === 'May'){
        month = '05';
    }else if(month === 'June'){
        month = '06';
    }else if(month === 'July'){
        month = '07';
    }else if(month === 'August'){
        month = '08';
    }else if(month === 'September'){
        month = '09';
    }else if(month === 'October'){
        month = '10';
    }else if(month === 'November'){
        month = '11';
    }else if(month === 'December'){
        month = '12';
    }
    const formattedDate = dayOfMonth+ "/" + month  + "/" + year;
    if(dayOfWeek === 'Monday'){
        dayOfWeek = 'T2';
    }else if(dayOfWeek === 'Tuesday'){
        dayOfWeek = 'T3';
    }else if(dayOfWeek === 'Wednesday'){
        dayOfWeek = 'T4';
    }else if(dayOfWeek === 'Thursday'){
        dayOfWeek = 'T5';
    }else if(dayOfWeek === 'Friday'){
        dayOfWeek = 'T6';
    }else if(dayOfWeek === 'Saturday'){
        dayOfWeek = 'T7';
    }else if(dayOfWeek === 'Sunday'){
        dayOfWeek = 'CN';
    }
    sessionStorage.setItem("thu", dayOfWeek);
    sessionStorage.setItem("ngay", formattedDate);
}



// btn tim ve
btnTimVe.addEventListener('click', function(){
    if(inputList[0].value !== inputList[1].value 
        &&  inputList[0].value === 'Hà Nội'
        &&  inputList[1].value === 'Thái Bình'
        // so sánh ngày phải lớn hơn ngày hiện tại
        ) 
    {
        console.log(inputList[0].value);
        console.log(inputList[1].value);
        loadListVe(listVe);
    }else {
        loadListVe(null);
    }
});
// range price
btnPriceRange.addEventListener('input', function(){
    valuePriceRange.style.display = 'inline-block';
    valuePriceRange.innerText = (Math.floor(this.value / 10000) * 10000 +'').replace(/\B(?=(\d{3})+(?!\d))/g, ".")+ ' đ';
});
btnPriceRange.addEventListener('blur', function(){
    valuePriceRange.style.display = 'none';
    loadLocGiaVe();
});
// selected img detail
const selectedItemImg = function(itemDeTail) {
    const listImgItem = itemDeTail.querySelectorAll('.img-item');
    const imgSelected = itemDeTail.querySelector('.img-selected');
    const btnLeft = itemDeTail.querySelector('.icon-left');
    const btnRight = itemDeTail.querySelector('.icon-right');
    const idPageImg = itemDeTail.querySelector('.id-page__img');
    const listImg = [];
    listImgItem.forEach(function(value, index){
        listImg.push(value.style.backgroundImage);
        value.addEventListener('click', function() {
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            value.classList.add('btn__border--selected');
            imgSelected.style.backgroundImage = value.style.backgroundImage;
            idPageImg.innerText = `${index + 1}/6`;
            // set button left right hidden or visible
            if(index === 0){
                btnLeft.classList.add('icon--disable');
            } else if(index === 5){
                btnRight.classList.add('icon--disable');
            } else if (index === 1 || index === 2) {
                btnRight.classList.remove('icon--disable');
                btnLeft.classList.remove('icon--disable');
                listImgItem[5].style.display = 'none';
                listImgItem[0].style.display = 'block';
            } else {
                btnLeft.classList.remove('icon--disable');
                btnRight.classList.remove('icon--disable');
                listImgItem[0].style.display = 'none';
                listImgItem[5].style.display = 'block';
            }
        });
    });

    btnLeft.addEventListener('click', function(e) {
        let indexCurrent = listImg.indexOf(imgSelected.style.backgroundImage);
        if(indexCurrent === 0) {
            e.preventDefault();
        }else {
            btnRight.classList.remove('icon--disable');
            idPageImg.innerText = `${indexCurrent}/6`;
            // xóa ảnh đang có border
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            if(indexCurrent - 1 === 0){
                btnLeft.classList.add('icon--disable');
            } 
                
            if(indexCurrent - 1 < 2){
                listImgItem[5].style.display = 'none';
                listImgItem[0].style.display = 'block';
            };
            imgSelected.style.backgroundImage = listImg[indexCurrent - 1];
            listImgItem[indexCurrent - 1].classList.add('btn__border--selected');   
        }
    });
    btnRight.addEventListener('click', function(e) {
        let indexCurrent = listImg.indexOf(imgSelected.style.backgroundImage);
        if (indexCurrent === 5) {
            e.preventDefault();
        }else {
            idPageImg.innerText = `${indexCurrent + 2}/6`;
            btnLeft.classList.remove('icon--disable');
            // xóa ảnh đang có border
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            if(indexCurrent + 1 === 5){
                btnRight.classList.add('icon--disable');
                imgSelected.style.backgroundImage = listImg[indexCurrent + 1];
                listImgItem[indexCurrent + 1].classList.add('btn__border--selected');
            } else if(indexCurrent + 1 >= 2){
                listImgItem[0].style.display = 'none';
                listImgItem[5].style.display = 'block';
            }
            imgSelected.style.backgroundImage = listImg[indexCurrent + 1];
            listImgItem[indexCurrent + 1].classList.add('btn__border--selected');
        }
    });
};
// Create detail
const createActiveDeTail = function(ticket) {
    const listDetail = ticket.querySelectorAll('.ticked-detail__main-content');
    const listHeaderDeTail = ticket.querySelectorAll('.ticked-detail__header-item');
    const lineHeaderDeTail = ticket.querySelector('.line');
    const selected = ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected');
    const rect = selected.getBoundingClientRect();
    // active detail
    // Lỗi offSetLeft và offSetWidth trả về undifine ?
    const rect0Left = ticket.querySelectorAll('.ticked-detail__header-item')[0].getBoundingClientRect().left;
    lineHeaderDeTail.style.left = `${rect.left - rect0Left}px`;
    lineHeaderDeTail.style.width = `${rect.width}px`;
    // form img
    selectedItemImg(listDetail[0]);
    listHeaderDeTail.forEach((value, index) => {
        const itemDeTail = listDetail[index];
        value.addEventListener('click', function(){
            // hủy các element đã select;
            ticket.querySelector('.ticked-detail__main-content.active').classList.remove('active')
            ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected').classList.remove('ticked-detail--selected');
            const rectClick = this.getBoundingClientRect();
            lineHeaderDeTail.style.left = (rectClick.left - rect0Left) + 'px';
            lineHeaderDeTail.style.width = rectClick.width + 'px';
            itemDeTail.classList.add('active');
            value.classList.add('ticked-detail--selected');
        });
    });
};
//Set mac dinh detail
const setMacDinh = function(ticket, index) {
    // xóa hết các element đang active
    ticket.querySelector('.ticked-detail__main-content.active').classList.remove('active')
    ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected').classList.remove('ticked-detail--selected');
    // set lại mặc định là index;
    const listDetail = ticket.querySelectorAll('.ticked-detail__main-content');
    const listHeaderDeTail = ticket.querySelectorAll('.ticked-detail__header-item');
    listDetail[index].classList.add('active');
    listHeaderDeTail[index].classList.add('ticked-detail--selected');
};

const setDefaultSeat = function(listSeat, seatLast, listSeatDisable, imgEmpty) {
    listSeat.forEach(seat => {
        seat.style.backgroundImage = imgEmpty;
    })
    listSeatDisable.forEach(seat=> {
        seat.style.backgroundImage = 'none';
    })
    seatLast.style.backgroundImage = imgEmpty;
}
const seatCheckedImg = function(seat, imgChecked) {
    return seat.style.backgroundImage === imgChecked
}

function addCheckedImg() {
    if(seatCheckedImg(this, imgChecked)){
        this.style.backgroundImage = imgEmpty;
        
    }else {
        this.style.backgroundImage = imgChecked;

    }
}
function selectedTicket(ticket) {
    const listSeat = ticket.querySelectorAll('table tr:nth-child(n+3) td');
    const listSeatDisable = ticket.querySelectorAll('table tr:nth-child(n+2) td:nth-child(3)');
    const seatLast = ticket.querySelector('table tr:last-child td:nth-child(3)');
    const totalPrice = ticket.querySelector('.total-price span');
    const tableTickcet = ticket.querySelector('table');
    const listBuyContent = ticket.querySelectorAll('.ticket-buy__content');
    const ticketDetailHeader = ticket.querySelectorAll('.ticket-buy__step-detail');
    const ticketDetailHeaderStep = ticket.querySelectorAll('.ticket-buy__step-detail span');
    const lineStepHeader = ticket.querySelectorAll('.line-step');
    const total = ticket.querySelector('.total-ticket');
    const totalLeft = ticket.querySelector('.total-ticket__left');
    const btnNext = ticket.querySelector('.btn-next-step');
    const btnBack = ticket.querySelector('.btn-back-step');
    const txtNumberSeat = ticket.querySelector('.number-seat span');
    const labelNumberSeat = ticket.querySelector('.number-seat');
    const priceTicket = parseFloat(ticket.querySelector('.ticket-info__bus-price').innerText.replace(/\D/g, '')); // gia ve 120k
    let numberSeat = '';
    let relustPriceTicket = 0;
    const listRadioFrom = ticket.querySelectorAll('.location__form-content');
    const listRadioTo = ticket.querySelectorAll('.location__to-content');

    setDefaultSeat(listSeat, seatLast, listSeatDisable, imgEmpty, imgChecked);
    listSeat.forEach(seat => {
        seat.addEventListener('click', addCheckedImg);
    });
    listSeatDisable.forEach(seat => {
        seat.removeEventListener('click', addCheckedImg);
    })
    seatLast.addEventListener('click', addCheckedImg);
    // tính tổng giá
    tableTickcet.addEventListener('click', function() {
        let countSeat = 0;
        numberSeat = '';
        listSeat.forEach(seat => {
            if(seat.style.backgroundImage === imgChecked){
                countSeat++;
                totalPrice.innerText = `${countSeat * priceTicket} đ`;
                sessionStorage.setItem('giaVe', countSeat * priceTicket);
                // lấy số ghế 
                seat.querySelectorAll('.td-after').forEach( laySoGhe =>{
                    numberSeat += laySoGhe.innerText.substr(8, 2) + ' ';
                });
            } 
        })
        relustPriceTicket = countSeat * priceTicket;
        if(relustPriceTicket == 0){
            // truong hop het vong lap ma van ko tim thay ve nao dc chon thi set txtPrice = 0
            totalPrice.innerText = `${relustPriceTicket} đ`;
            indexCurrentTicket = 0;
            sessionStorage.setItem('giaVe', countSeat * priceTicket);
            // ẩn số ghế đã chọn
            totalLeft.style.display = 'none';
            total.style.justifyContent = 'flex-end';
        }else {
            totalPrice.innerText = `${relustPriceTicket} đ`;
            // hiện số ghế, set text so ghe đã chọn ở totalLeft nhưng ẩn nut back đi
            totalLeft.style.display = 'flex'
            total.style.justifyContent = 'space-between';
            txtNumberSeat.innerText = numberSeat;
            btnBack.style.display = 'none';
            labelNumberSeat.style.display = 'block';
        }
    })

// khoi tao from chon ghe va nhap thong tin
// cac buoc chon ghe nhap thong tin
    // tim header nao co class step--selected thi xoa di, add class step--nomal
    ticketDetailHeader.forEach( headerStep => {
        headerStep.classList.remove('step--selected');
        headerStep.classList.add('step--nomal');
    })
    // thay txtHeader ve dang so
    ticketDetailHeaderStep.forEach((txtHeader, index) => {
        txtHeader.innerHTML = index + 1;
    })
    // de header[0] mac dinh
    ticketDetailHeader[0].classList.add('step--selected');
    // index step = 0
    let indexCurrentTicket = 0;
    // de background color line step ve #e8e8e8
    lineStepHeader.forEach(line => {
        line.style.backgroundColor = '#e8e8e8';
    })
    // cho gia ve ve 0
    totalPrice.innerText = `0 đ`;
    // chỉ hiện form 1 ẩn hểt 2 form còn lại
    listBuyContent[0].style.display = 'flex';
    listBuyContent[1].style.display = 'none';
    listBuyContent[2].style.display = 'none';
    // ẩn nút back số ghế 
    totalLeft.style.display = 'none';
    total.style.justifyContent = 'flex-end';
// end khoi tao form 

var test = false;
ticket.addEventListener("input", function () {
    // validate form
    const name = ticket.querySelectorAll('.form-info_item input')[0].value;
    const phone = ticket.querySelectorAll('.form-info_item input')[1].value;
    const email = ticket.querySelectorAll('.form-info_item input')[2].value;
    if (name.length == 0) {
        test = true;
        ticket.querySelector('#empty-name').innerHTML = "Bạn chưa nhập họ tên";
    } else {
        if (!validateName(name)) {
            ticket.querySelector('#empty-name').innerHTML = "Họ tên không hợp lệ";
            test = true
        } else {
            ticket.querySelector('#empty-name').innerHTML = "";
        }
    }
  
    if (phone.length == 0) {
            test = true;
            ticket.querySelector('#empty-phone').innerHTML = "Bạn chưa nhập số điện thoại";
    } else {
        if (!validatePhone(phone)) {
                ticket.querySelector('#empty-phone').innerHTML = "Số điện thoại không hợp lệ";
                test = true;
        } else {
                ticket.querySelector('#empty-phone').innerHTML = "";
        }
    }
  
    if (email.length == 0) {
        test = true;
        ticket.querySelector('#empty-email').innerHTML = "Bạn chưa nhập email";
    } else {
        if (!validateEmail(email)) {
            ticket.querySelector('#empty-email').innerHTML = "Email không hợp lệ";
            test = true;
        } else {
            ticket.querySelector('#empty-email').innerHTML = "";
        }
    }  
});
    // btn next step
    btnNext.addEventListener('click', function() {
        indexCurrentTicket ++;
        if(indexCurrentTicket === 3){
                if (test) {
                    // gui id ve sang cho thanh toan + ten + so dien thoai + email
                    let nameTK = ticket.querySelectorAll('.form-info_item input')[0].value;
                    let phoneTK = ticket.querySelectorAll('.form-info_item input')[1].value;
                    let emailTK = ticket.querySelectorAll('.form-info_item input')[2].value;
                    let idVe = ticket.querySelector('.id-ve').innerText;
                    sessionStorage.setItem("name", nameTK);
                    sessionStorage.setItem("phone", phoneTK);
                    sessionStorage.setItem("email", emailTK);
                    sessionStorage.setItem("idVe", idVe);
                    if(ticket.querySelector('.ticket-info__bus-name').innerText.split(' ')[0] == 'Hải'){
                        window.location.href = "Dat_cho.html";
                    }else {
                        window.location.href = "Thanh_toan_online.html";
                    }
                }else {
                    alert('Vui lòng nhập đúng thông tin');
                    indexCurrentTicket --;
                    return;
                }
        }
        if(relustPriceTicket > 0){
            //ẩn số ghế hiện nút back va formLeft 
            totalLeft.style.display = 'flex';
            total.style.justifyContent = 'space-between';
            btnBack.style.display = 'block';
            labelNumberSeat.style.display = 'none';
            // hien form tiep va an form hien tai (index da tang len 1 roi nen form hien tai la index-1)
            listBuyContent[indexCurrentTicket].style.display = 'flex';
            listBuyContent[indexCurrentTicket - 1].style.display = 'none';
            // set header 
            ticketDetailHeader[indexCurrentTicket -1].classList.remove('step--selected');
            ticketDetailHeader[indexCurrentTicket -1].classList.remove('step--nomal');
            ticketDetailHeader[indexCurrentTicket].classList.add('step--selected');
            ticketDetailHeaderStep[indexCurrentTicket -1].innerHTML = '<i class="fa-solid fa-check icon-ckeck"></i>';
            // set header line
            lineStepHeader[indexCurrentTicket - 1].style.backgroundColor = 'var(--primary-color)';
        }
        // còn check xem nhập thông tin chưa
        else {
            if (indexCurrentTicket == 1) {
                alert('Vui lòng chọn ghế ngồi!');
            }
            indexCurrentTicket --;
        }
    })
    // btn back step
    btnBack.addEventListener('click', function() {
        // index la form hien tai
        // nếu mà quay lại thì ẩn form hiện tại hiện form hiện tại -1
        listBuyContent[indexCurrentTicket].style.display = 'none';
        listBuyContent[indexCurrentTicket - 1].style.display = 'flex';
        // set header
        ticketDetailHeader[indexCurrentTicket - 1].classList.add('step--selected');
        ticketDetailHeader[indexCurrentTicket - 1].classList.add('step--nomal');
        ticketDetailHeader[indexCurrentTicket].classList.remove('step--selected');
        ticketDetailHeaderStep[indexCurrentTicket -1].innerHTML = indexCurrentTicket;
        // huy line header 
        lineStepHeader[indexCurrentTicket - 1].style.backgroundColor = "#e8e8e8";
        // Mỗi lần ẩn thì giảm index đi 1
        indexCurrentTicket--;
        // nếu form hiện tại -1 == 0 thì display của total-left = none - trả total về flex-end
        if(indexCurrentTicket == 0) {
            totalLeft.style.display = 'none';
            total.style.justifyContent = 'flex-end';
            if(relustPriceTicket !== 0) {
                totalPrice.innerText = `${relustPriceTicket} đ`;
                // hiện số ghế đã chọn ở totalLeft nhưng ẩn nut back đi
                totalLeft.style.display = 'flex'
                total.style.justifyContent = 'space-between';
                txtNumberSeat.innerText = numberSeat;
                btnBack.style.display = 'none';
                labelNumberSeat.style.display = 'block';
            }
        }
    })
    // slected radio
    listRadioFrom.forEach(value => {
        value.addEventListener('click', function(){
            value.querySelector('input').checked = true;
        })
    })
    listRadioTo.forEach(value => {
        value.addEventListener('click', function(){
            value.querySelector('input').checked = true;
        })
    })
}
// booking ticket
const closeBooking = function(btnClose, btnBooking) {
    btnClose.addEventListener('click', function() {
        btnClose.style.display = 'none';
        btnBooking.style.display = 'block';
    })
}
// scroll 
function scrollDown() {
    const scrollDistance = 400; 
    window.scrollTo({
        top: scrollDistance,
        behavior: "smooth"
    });
}
// main ticket
mainBuyTicket.addEventListener('click', function () {
    clickVe();
})
function clickVe() {
    document.querySelectorAll('.ticket').forEach(ticket => {
        const btnDetail = ticket.querySelector('.detail-btn');
        const iconBtnDeTail = ticket.querySelector('.detail-btn i');
        const mainDeTail = ticket.querySelector('.ticked-detail');
        const ratingStar = ticket.querySelector('.ticket-info__bus-rating');
        const btnBooking = ticket.querySelector('.booking-btn');
        const btnClose  = ticket.querySelector('.close-btn');
        const ticketBuy = ticket.querySelector('.ticket-buy');
        //click rating star
        ratingStar.addEventListener('click', function() {
            // set mac dinh star
            //scrollDown();
            setMacDinh(ticket, 4);
            mainDeTail.style.display = 'block';
            iconBtnDeTail.classList.remove('fa-caret-down');
            iconBtnDeTail.classList.add('fa-caret-up');
            createActiveDeTail(ticket);
            // đóng form chọn ghế
            btnClose.style.display = 'none';
            btnBooking.style.display = 'block';
            ticketBuy.style.display = 'none';
        });
        btnDetail.addEventListener('click', function() {
            if (mainDeTail.style.display !== 'block'){
                // hiện ra
                // scrollDown();
                btnClose.style.display = 'none';
                btnBooking.style.display = 'block';
                mainDeTail.style.display = 'block';
                ticketBuy.style.display = 'none';
                iconBtnDeTail.classList.remove('fa-caret-down');
                iconBtnDeTail.classList.add('fa-caret-up');
               createActiveDeTail(ticket);
            }else {
                // ẩn di
                mainDeTail.style.display = 'none';
                iconBtnDeTail.classList.remove('fa-caret-up');
                iconBtnDeTail.classList.add('fa-caret-down');
                // set lại như ban đầu
                setMacDinh(ticket, 0);
            }
        });
        // booking ticket
        btnBooking.addEventListener('click', function() {
            // scrollDown();
            btnClose.style.display = 'block';
            btnBooking.style.display = 'none';
            selectedTicket(ticket);
            // close thong tin chi tiet
            ticketBuy.style.display = 'block';
            mainDeTail.style.display = 'none';
            iconBtnDeTail.classList.remove('fa-caret-up');
            iconBtnDeTail.classList.add('fa-caret-down');
            // set lại như ban đầu
            setMacDinh(ticket, 0);
        });
        btnClose.addEventListener('click', function() {
            btnClose.style.display = 'none';
            btnBooking.style.display = 'block';
            ticketBuy.style.display = 'none';
        })
    });
}
// header click
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

// xem them
const btnXemThem = document.querySelector('.buttonXemThem ');
btnXemThem.addEventListener('click', function(){
    document.querySelectorAll('.ticket:nth-child(n+6)').forEach(value => {
        value.style.display = 'block';
    })
    if(btnXemThem.innerHTML === 'Xem thêm'){
        btnXemThem.innerHTML = 'Ẩn Bớt';
    }else {
        btnXemThem.innerHTML = 'Xem thêm';
        document.querySelectorAll('.ticket:nth-child(n+6)').forEach(value => {
            value.style.display = 'none';
        })
    }
})
// back trang chu
document.querySelector('.back-trang-chu').addEventListener('click', function(){
    window.location.href = 'TrangChu.html';
})