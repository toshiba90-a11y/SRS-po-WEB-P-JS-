let zadacha = JSON.parse(localStorage.getItem('my_spa_tasks')) || [];
let shag = JSON.parse(localStorage.getItem('my_spa_expenses')) || [];
let savedNote = localStorage.getItem('my_spa_note') || '';

let btnZadacha = document.getElementById('btnZadacha');
let btnShag = document.getElementById('btnShag');
let btnNotes = document.getElementById('btnNotes');

let vkladkaZadacha = document.getElementById('vkladkaZadacha');
let vkladkaShag = document.getElementById('vkladkaShag');
let vkladkaNotes = document.getElementById('vkladkaNotes');

function openVkladka(vkladkaName) {
    vkladkaZadacha.classList.add('hidden');
    vkladkaShag.classList.add('hidden');
    vkladkaNotes.classList.add('hidden');

    btnZadacha.classList.remove('active');
    btnShag.classList.remove('active');
    btnNotes.classList.remove('active');

    if (vkladkaName === 'zadacha') {
        vkladkaZadacha.classList.remove('hidden');
        btnZadacha.classList.add('active');
    } else if (vkladkaName === 'shag') {
        vkladkaShag.classList.remove('hidden');
        btnShag.classList.add('active');
    } else if (vkladkaName === 'notes') {
        vkladkaNotes.classList.remove('hidden');
        btnNotes.classList.add('active');
    }
}

btnZadacha.addEventListener('click', function() {
    openVkladka('zadacha');
});

btnShag.addEventListener('click', function() {
    openVkladka('shag');
});

btnNotes.addEventListener('click', function() {
    openVkladka('notes');
});

let zadachaInput = document.getElementById('zadachaInput');
let addZadachaBtn = document.getElementById('addZadachaBtn');
let spisokZadacha = document.getElementById('spisokZadacha');

function generZadacha() {
    let htmlContent = '';
    for (let i = 0; i < zadacha.length; i++) {
        htmlContent += `
            <div class="card">
                <span>${zadacha[i]}</span>
                <button class="delete-btn" onclick="deleteZadacha(${i})">Удалить</button>
            </div>
        `;
    }
    spisokZadacha.innerHTML = htmlContent;
}

addZadachaBtn.addEventListener('click', function() {
    let text = zadachaInput.value.trim();
    if (text !== '') {
        zadacha.push(text);
        localStorage.setItem('my_spa_tasks', JSON.stringify(zadacha));
        zadachaInput.value = '';
        generZadacha();
    }
});

function deleteZadacha(index) {
    zadacha.splice(index, 1);
    localStorage.setItem('my_spa_tasks', JSON.stringify(zadacha));
    generZadacha();
}

let marshrut = document.getElementById('marshrut');
let kolShag = document.getElementById('kolShag');
let addMarshrutBtn = document.getElementById('addMarshrutBtn');
let spisokMarshrut = document.getElementById('spisokMarshrut');
let sumShag = document.getElementById('sumShag');

function generMarshrut() {
    let htmlContent = '';
    let sum = 0;

    for (let i = 0; i < shag.length; i++) {
        sum += Number(shag[i].amount);
        htmlContent += `
            <div class="card">
                <div>
                    <strong>${shag[i].name}</strong> — ${shag[i].amount} шагов
                </div>
                <button class="delete-btn" onclick="deleteMarshrut(${i})">Удалить</button>
            </div>
        `;
    }

    spisokMarshrut.innerHTML = htmlContent;
    sumShag.innerText = sum;
}

addMarshrutBtn.addEventListener('click', function() {
    let name = marshrut.value.trim();
    let amount = kolShag.value;

    if (name !== '' && amount > 0) {
        let newItem = {
            name: name,
            amount: amount
        };
        shag.push(newItem);
        localStorage.setItem('my_spa_expenses', JSON.stringify(shag));
        
        marshrut.value = '';
        kolShag.value = '';
        generMarshrut();
    }
});

function deleteMarshrut(index) {
    shag.splice(index, 1);
    localStorage.setItem('my_spa_expenses', JSON.stringify(shag));
    generMarshrut();
}

let noteZametka = document.getElementById('noteZametka');
let noteStatus = document.getElementById('noteStatus');

noteZametka.value = savedNote;

noteZametka.addEventListener('input', function() {
    localStorage.setItem('my_spa_note', noteZametka.value);
    noteStatus.innerText = 'Сохранено только что...';
});

generZadacha();
generMarshrut();