const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $enemiesContainer = document.querySelector('.enemies');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),


    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },

    renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },

    renderProgressbarHP() {
        const healthPercent = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = healthPercent + '%';
        updateProgressbarColor(this.elProgressbar, healthPercent);
    },


    changeHP(count) {
        if (this.damageHP < count) {
            this.damageHP = 0;
            alert('You Lost!');
            disableButtons();
        } else {
            this.damageHP -= count;
        }
        this.renderHP(); 
    },
};

function Enemy(id, name, defaultHP) {
    this.id = id;
    this.name = name;
    this.defaultHP = defaultHP;
    this.damageHP = defaultHP;
    this.elHP = document.getElementById(`health-enemy-${id}`);
    this.elProgressbar = document.getElementById(`progressbar-enemy-${id}`);


    this.renderHP = function () {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    this.renderHPLife = function () {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    };

    this.renderProgressbarHP = function () {
        const healthPercent = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = healthPercent + '%';
        updateProgressbarColor(this.elProgressbar, healthPercent);
    };


    this.changeHP = function (count) {
        if (this.damageHP < count) {
            this.damageHP = 0;
            alert(this.name + ' fainted!');
            nextEnemy();
        } else {
            this.damageHP -= count;
        }
        this.renderHP(); 
    };
}


const enemies = [
    new Enemy(1, 'Charmander', 100),
    new Enemy(2, 'Squirtle', 100),
];

let currentEnemyIndex = 0;
let currentEnemy = enemies[currentEnemyIndex];

$btnKick.addEventListener('click', () => attack(currentEnemy, 'kick'));
$btnSpecial.addEventListener('click', () => attack(currentEnemy, 'special'));

function init() {
    console.log('Start Game!');
    character.renderHP(); 
    enemies.forEach(enemy => enemy.renderHP()); 
}

function updateProgressbarColor(progressbar, healthPercent) {
    if (healthPercent > 70) {
        progressbar.style.background = 'linear-gradient(to right, lime, #8bf500)';
    } else if (healthPercent > 30) {
        progressbar.style.background = 'linear-gradient(to right, #ffcc00, #f1f500)';
    } else {
        progressbar.style.background = 'linear-gradient(to right, #d20000, #f51700)';
    }
}

function attack(target, attackType) {
    let damage = random(20);
    if (attackType === 'special') {
        damage = Math.ceil(damage * 1.5); 
    }
    target.changeHP(damage); 

    if (target.damageHP > 0) {
        setTimeout(() => {
            const enemyDamage = random(15);
            character.changeHP(enemyDamage); 
        }, 1000);
    }
}

function nextEnemy() {
    currentEnemyIndex = (currentEnemyIndex + 1) % enemies.length;
    currentEnemy = enemies[currentEnemyIndex];
    if (currentEnemy.damageHP === 0) {
        alert('You Win!');
        disableButtons();
    }
}

function disableButtons() {
    $btnKick.disabled = true;
    $btnSpecial.disabled = true;
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();