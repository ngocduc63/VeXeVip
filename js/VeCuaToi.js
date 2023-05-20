//Sự kiện chuyển trạng thái thông tin vé
const listStatic = document.querySelectorAll('.tab-action')
listStatic[0].addEventListener("click", function() {
    listStatic[0].classList.add('active');
    listStatic[1].classList.remove('active');
    listStatic[2].classList.remove('active');
});
listStatic[1].addEventListener("click", function() {
    listStatic[1].classList.add('active');
    listStatic[0].classList.remove('active');
    listStatic[2].classList.remove('active');
});
listStatic[2].addEventListener("click", function() {
    listStatic[2].classList.add('active');
    listStatic[1].classList.remove('active');
    listStatic[0].classList.remove('active');
});
//Sự kiện Submenu
const user = document.querySelector('.user');
const subMenu = document.querySelector('.sub-menu');

user.addEventListener('click', function() {
    subMenu.classList.toggle('open');
});
// log out
document.querySelector('#logout').addEventListener('click', function(){
   window.location.href = "index.html";
});
document.querySelector('#out').addEventListener('click', function(){
    window.location.href = "index.html";
});

// hien thi ve
import { listVe} from './listVe.js';
const nameTK = sessionStorage.getItem("name");
const idVe = sessionStorage.getItem("idVe");
const thu = sessionStorage.getItem("thu");
const ngay = sessionStorage.getItem("ngay");
if(nameTK){
    let thoiGianBD = '';
    let tenNhaXe = '';
    let diaDiemDon = '';
    let diaDiemTra = '';
    listVe.forEach(ve => {
        if(ve.id == idVe){
            thoiGianBD = ve.ThoiGianXP;
            tenNhaXe = ve.TenNhaXe;
            diaDiemDon = ve.DiaDiemXP;
            diaDiemTra = ve.DiaDiemKT;
            ve.SoGheTrong = ve.SoGheTrong - 1;
            return;
        }
    })
    const html = `
        <div class="thong-tin-ve-da-dat">
        <div class="thong-tin-ve-contain">
            <div class="chi-tiet-ve"><h3>${thoiGianBD} - ${thu}, ${ngay}</h3></div>
            <div class="chi-tiet-ve">Tên nhà xe: <b>${tenNhaXe}</div>
            <div class="chi-tiet-ve">Họ tên khách hàng:<b> ${nameTK}</b></div>
            <div class="chi-tiet-ve">Lộ trình: <b>${diaDiemDon} - ${diaDiemTra}</b></div>
            <div class="chi-tiet-ve">Biển số xe: <b>17B-049.53</b></div>
        </div>
        <div class="btn-lien-lac-contain">
            <div class="btn-lien-lac">
                <i class="fa-solid fa-phone"></i>
                <span>Gọi điện</span>
            </div>
        </div>
        <div class="trang-thai-ve">Chưa thanh toán</div>
        </div>
    `
    document.querySelector('.slide-static').innerHTML = html;
}